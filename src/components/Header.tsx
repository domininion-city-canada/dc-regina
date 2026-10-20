import React, { useState, useEffect, forwardRef } from 'react';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, ArrowUpRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { NAV_CTA, NAV_GROUPS, NAV_SINGLES, SITE, type NavGroup, type NavItem } from '@/data/site';

type NavLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  item: NavItem;
  /** Extra work on activation, e.g. closing the mobile panel. */
  onNavigate?: () => void;
};

/**
 * Every nav surface renders its items through this one component, so the
 * desktop menus and the mobile panel cannot drift apart.
 *
 * It forwards its ref and spreads the props it is handed, because Radix's
 * `asChild` renders the menu item *as* this component: the role, the
 * roving-focus wiring and the handler that closes the menu all arrive as
 * props. A plain function component would drop every one of them, and React
 * would warn that the ref cannot attach.
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ item, onNavigate, onClick, children, ...rest }, ref) => {
    // Radix supplies its own onClick; run it before ours rather than over it.
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      /*
        Cross-route and cold-load hash scrolling belongs to useHashScroll.
        This only covers the one case the router cannot signal: clicking the
        same hash you are already on, where the location does not change and
        no effect re-runs.
      */
      if (item.href.startsWith('/#') && window.location.pathname === '/') {
        const id = item.href.split('#')[1];
        const el = document.getElementById(id);
        if (el) {
          event.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      onNavigate?.();
    };

    if (item.internal) {
      return (
        <Link {...rest} ref={ref} to={item.href} onClick={handleClick}>
          {children}
        </Link>
      );
    }

    return (
      <a
        {...rest}
        ref={ref}
        href={item.href}
        onClick={handleClick}
        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
);
NavLink.displayName = 'NavLink';

/**
 * A grouped menu in the desktop bar.
 *
 * Radix portals the panel to <body>, which matters here: once the bar
 * scrolls it carries `backdrop-blur`, and a backdrop-filter makes an element
 * the containing block for its positioned descendants. Rendered inside the
 * bar, the panel would be clipped by it.
 */
const NavMenu = ({ group, triggerClass }: { group: NavGroup; triggerClass: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className={`${triggerClass} group inline-flex items-center gap-1.5`}>
      {group.name}
      <ChevronDown
        className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      sideOffset={16}
      /*
        border-foreground/10, not border-border/*. Brampton bakes the alpha
        into the token itself (`--border: 0 0% 100% / 0.1`), so Tailwind
        compiles `border-border/60` to `hsl(0 0% 100% / 0.1 / 0.6)` — invalid
        CSS, silently falling back to currentColor and drawing a white box.
      */
      className="w-72 border border-foreground/10 bg-background p-1.5"
    >
      {group.items.map((item) => (
        <DropdownMenuItem
          key={item.name}
          asChild
          /*
            `asChild` concatenates this onto the link's own classes, so a
            `block` on the child would lose to the item's base `flex
            items-center` and the label and blurb would sit side by side.
            Override the direction here, where tailwind-merge can resolve it.
          */
          className="cursor-pointer flex-col items-start gap-1 px-3 py-3 focus:bg-foreground/5"
        >
          <NavLink item={item}>
            <span className="flex w-full items-center gap-1.5 text-sm font-medium text-foreground">
              {item.name}
              {item.external && <ArrowUpRight className="h-3 w-3 text-foreground/30" aria-hidden="true" />}
            </span>
            {item.blurb && (
              <span className="text-xs font-light leading-snug text-foreground/50">{item.blurb}</span>
            )}
          </NavLink>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const Header: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel when the route changes under it.
  useEffect(() => setSheetOpen(false), [location.pathname]);

  const navLinkClass =
    'text-[10px] uppercase tracking-[0.25em] font-medium text-foreground/50 hover:text-foreground transition-colors';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-foreground/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="-ml-1 flex min-h-11 shrink-0 items-center gap-3 py-1 pl-1 pr-2 group">
          <Logo title={`${SITE.name} logo`} className="h-9 md:h-11 w-auto" />
          <div className="text-[10px] tracking-[0.3em] font-medium uppercase text-foreground/80 hidden sm:block">
            {SITE.locality}
          </div>
        </Link>

        {/* Desktop: grouped menus, one standalone link, one call to action. */}
        <nav className="hidden lg:flex items-center gap-9 xl:gap-10" aria-label="Main">
          {NAV_GROUPS.map((group) => (
            <NavMenu key={group.name} group={group} triggerClass={navLinkClass} />
          ))}
          {NAV_SINGLES.map((item) => (
            <NavLink key={item.name} item={item} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            item={NAV_CTA}
            className="hidden items-center whitespace-nowrap border border-foreground/20 bg-foreground/5 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all hover:bg-foreground/10 md:inline-flex"
          >
            {NAV_CTA.name}
          </NavLink>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-11 w-11 hover:bg-foreground/5 text-foreground/60"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* The full menu stays reachable at every width, but below lg it is
              the only way to navigate, so the trigger is not hidden there. */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 hover:bg-foreground/5 text-foreground"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[440px] max-w-full bg-background border-l border-foreground/10 p-0 overflow-y-auto overscroll-contain [&>button]:hidden"
            >
              <div className="flex flex-col min-h-full">
                <div className="min-h-16 md:min-h-20 safe-top flex items-center justify-between px-6 md:px-10 border-b border-foreground/10 sticky top-0 bg-background z-10">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">Menu</span>
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="-mr-2 w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 px-6 md:px-10 py-8 md:py-10 flex flex-col gap-8 md:gap-10" aria-label="Main">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.name}>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 mb-4">
                        {group.name}
                      </p>
                      <div className="flex flex-col">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.name}
                            item={item}
                            onNavigate={() => setSheetOpen(false)}
                            className="flex min-h-[44px] items-center gap-2 py-3 text-xl md:text-2xl font-light text-foreground/70 hover:text-foreground transition-colors tracking-tight"
                          >
                            {item.name}
                            {item.external && (
                              <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/25" aria-hidden="true" />
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 mb-4">{NAV_GROUPS.length ? 'More' : 'Pages'}</p>
                    <div className="flex flex-col">
                      {NAV_SINGLES.map((item) => (
                        <NavLink
                          key={item.name}
                          item={item}
                          onNavigate={() => setSheetOpen(false)}
                          className="flex min-h-[44px] items-center py-3 text-xl md:text-2xl font-light text-foreground/70 hover:text-foreground transition-colors tracking-tight"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                </nav>

                <div className="px-6 md:px-10 pt-8 pb-8 safe-bottom border-t border-foreground/10">
                  <NavLink
                    item={NAV_CTA}
                    onNavigate={() => setSheetOpen(false)}
                    className="btn-nb-primary w-full justify-center"
                  >
                    {NAV_CTA.name}
                  </NavLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

    </header>
  );
};

export default Header;

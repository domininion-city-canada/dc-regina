import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    className,
    threshold = 0.1,
    delay = 0,
    direction = 'up'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Captured now, not read in the cleanup. React clears ref.current
        // before cleanup runs on unmount, so the old `if (ref.current)` guard
        // was always false there and the observer was never detached — one
        // leaked observer per reveal, and this component wraps most cards on
        // the site.
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [threshold]);

    const getDirectionClass = () => {
        switch (direction) {
            case 'up': return 'translate-y-10';
            case 'down': return '-translate-y-10';
            case 'left': return 'translate-x-10';
            case 'right': return '-translate-x-10';
            default: return '';
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getDirectionClass()}`,
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;

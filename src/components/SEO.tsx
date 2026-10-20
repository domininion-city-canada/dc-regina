import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE } from '@/data/site';

interface SEOProps {
    /** Page name only — the site name is appended. */
    title: string;
    description: string;
    /** Absolute URL, when this page should point somewhere other than itself. */
    canonical?: string;
    /**
     * Whether search engines should index this page. Default true; pass false
     * for anything behind a login or otherwise not meant to be found.
     */
    index?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, index = true }) => {
    const { pathname } = useLocation();

    const fullTitle = `${title} | ${SITE.name}`;

    /*
      Built from the pathname, not window.location.href. href carries the query
      string and hash, so arriving from a campaign link made the page declare
      `?utm_source=...` as its own canonical — which is precisely the
      duplicate-URL problem a canonical exists to solve.
    */
    const currentUrl = canonical ?? `${SITE.url}${pathname}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {/* A page kept out of the index (the 404) names no canonical. */}
            {index && <link rel="canonical" href={currentUrl} />}
            <meta
                name="robots"
                content={index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}
            />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;

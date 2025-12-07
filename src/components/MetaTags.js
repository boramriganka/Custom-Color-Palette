import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * MetaTags component for dynamic SEO and PWA meta tags
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - Comma-separated keywords
 * @param {string} image - Open Graph image URL
 * @param {string} url - Canonical URL
 * @param {string} type - Open Graph type (default: 'website')
 */
function MetaTags({ 
  title = 'Custom Color - Color Palette Generator',
  description = 'Create, customize, and export beautiful color palettes with WCAG accessibility checking, multi-format export, and intuitive design tools.',
  keywords = 'color palette, color picker, palette generator, color scheme, design tools, accessibility, WCAG, color export, CSS colors, design system',
  image = '/icon-512x512.png',
  url,
  type = 'website'
}) {
  // Safe window access for SSR compatibility
  const currentUrl = typeof window !== 'undefined' ? (url || window.location.href) : url || '';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullTitle = title.includes('Custom Color') ? title : `${title} | Custom Color`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Custom Color" />
      <meta name="robots" content="index, follow" />
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {siteUrl && <meta property="og:image" content={`${siteUrl}${image}`} />}
      <meta property="og:site_name" content="Custom Color" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {currentUrl && <meta property="twitter:url" content={currentUrl} />}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {siteUrl && <meta property="twitter:image" content={`${siteUrl}${image}`} />}

      {/* PWA Meta Tags */}
      <meta name="application-name" content="Custom Color" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Custom Color" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#64B5F6" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#64B5F6" />
      <meta name="msapplication-navbutton-color" content="#64B5F6" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
}

export default MetaTags;

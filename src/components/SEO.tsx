import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = "Invue Digital - Premium Web & AI Development Agency",
  description = "Boutique digital agency crafting exceptional websites, mobile apps, and AI solutions. Transform your business with our premium development services.",
  keywords = "web development, mobile apps, AI development, digital agency, React, TypeScript, machine learning, custom software",
  image = "/images/og-image.jpg",
  url = "https://invuedigital.com",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes('Invue Digital') ? title : `${title} | Invue Digital`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Invue Digital" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Invue Digital" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#5941F7" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Invue Digital",
          "description": description,
          "url": url,
          "logo": `${url}/images/logo-dark.png`,
          "sameAs": [
            "https://linkedin.com/company/invuedigital",
            "https://twitter.com/invuedigital"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "Business"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "foundingDate": "2023",
          "numberOfEmployees": "2-10",
          "slogan": "Crafting Digital Excellence"
        })}
      </script>
    </Helmet>
  );
} 
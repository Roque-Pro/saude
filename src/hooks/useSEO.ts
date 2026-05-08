import { useEffect } from "react";
import { SEO_CONFIG } from "@/lib/seo-config";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: "website" | "article" | "profile";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
  schema?: any;
  noIndex?: boolean;
}

export const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterCard = "summary_large_image",
  canonicalUrl,
  schema,
  noIndex = false,
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
    const metaDescription = description || SEO_CONFIG.defaultDescription;
    const metaKeywords = keywords ? keywords.join(", ") : SEO_CONFIG.defaultKeywords.join(", ");
    const currentUrl = ogUrl || window.location.href;
    const metaOgImage = ogImage || `${SEO_CONFIG.baseUrl}${SEO_CONFIG.ogImage}`;

    // Update title
    document.title = fullTitle;

    // Standard Meta Tags
    updateMetaTag("name", "description", metaDescription);
    updateMetaTag("name", "keywords", metaKeywords);
    updateMetaTag("name", "author", SEO_CONFIG.author);
    updateMetaTag("name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

    // Open Graph
    updateMetaTag("property", "og:site_name", SEO_CONFIG.siteName);
    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:title", ogTitle || fullTitle);
    updateMetaTag("property", "og:description", ogDescription || metaDescription);
    updateMetaTag("property", "og:url", currentUrl);
    updateMetaTag("property", "og:image", metaOgImage);
    updateMetaTag("property", "og:locale", SEO_CONFIG.locale);

    // Twitter Card
    updateMetaTag("name", "twitter:card", twitterCard);
    updateMetaTag("name", "twitter:title", twitterTitle || ogTitle || fullTitle);
    updateMetaTag("name", "twitter:description", twitterDescription || ogDescription || metaDescription);
    updateMetaTag("name", "twitter:image", metaOgImage);
    if (SEO_CONFIG.twitterHandle) {
      updateMetaTag("name", "twitter:site", SEO_CONFIG.twitterHandle);
      updateMetaTag("name", "twitter:creator", SEO_CONFIG.twitterHandle);
    }

    // Canonical
    const href = canonicalUrl || currentUrl.split("?")[0];
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", href);

    // Schema.org Structured Data
    const existingSchema = document.querySelector('script[type="application/ld+json"][data-dynamic-schema]');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-dynamic-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // We don't necessarily want to remove meta tags on unmount as it might flash
      // but we should ensure schemas don't pile up.
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, ogType, schema, noIndex]);
};

function updateMetaTag(
  attribute: "name" | "property",
  attributeValue: string,
  content: string
) {
  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * 🚀 SEO OPTIMIZATION SUITE - DR. SAULLO GOMES
 * Otimizações avançadas para dominar SERPs no nicho de saúde
 */
import { SEO_CONFIG } from "./seo-config";

export interface BlogMetadata {
  title: string;
  slug: string;
  excerpt: string;
  htmlContent: string;
  publishedAt: string;
}

/**
 * 1. STRUCTURED DATA (Schema.org JSON-LD)
 */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician", // Mais específico que LocalBusiness ou MedicalBusiness
    "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/logo.png`,
    image: `${SEO_CONFIG.baseUrl}/og-image.png`,
    description: SEO_CONFIG.defaultDescription,
    telephone: "+55-11-99999-9999", // TODO: Atualizar com real
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Exemplo, 123", // TODO: Atualizar
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01234-567",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/drsaullo", // TODO: Atualizar
      "https://www.facebook.com/drsaullo",
      "https://www.linkedin.com/in/drsaullo",
    ],
    medicalSpecialty: "Lifestyle Medicine",
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${SEO_CONFIG.baseUrl}${item.item}`,
    })),
  };
}

export function getBlogPostingSchema(metadata: BlogMetadata, firstImageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.excerpt,
    image: firstImageUrl || `${SEO_CONFIG.baseUrl}${SEO_CONFIG.ogImage}`,
    datePublished: metadata.publishedAt,
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: SEO_CONFIG.author,
      url: SEO_CONFIG.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.baseUrl}/blog/${metadata.slug}`,
    },
    keywords: generateKeywords(metadata.title, metadata.excerpt),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 2. GERAR PALAVRAS-CHAVE AUTOMATICAMENTE
 * Nicho: Saúde, Bem-estar, Performance
 */
export function generateKeywords(title: string, excerpt: string): string {
  const healthKeywords = [
    "saúde integral",
    "bem-estar",
    "performance",
    "longevidade",
    "hábito saudável",
    "nutrição",
    "equilíbrio",
    "qualidade de vida",
    "prevenção",
    "dr saullo gomes",
  ];

  const titleKeywords = title.toLowerCase().split(" ").filter(w => w.length > 3).slice(0, 5);
  const excerptWords = excerpt
    .toLowerCase()
    .split(" ")
    .filter((w) => w.length > 4)
    .slice(0, 5);

  const combined = Array.from(new Set([...titleKeywords, ...excerptWords, ...healthKeywords])).slice(0, 15);
  return combined.join(", ");
}

/**
 * 3. OTIMIZAR HEADINGS (H1, H2, H3...)
 */
export function extractAndOptimizeHeadings(htmlContent: string) {
  const h1Regex = /<h1[^>]*>([^<]+)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
  const h3Regex = /<h3[^>]*>([^<]+)<\/h3>/gi;

  return {
    h1: Array.from(htmlContent.matchAll(h1Regex)).map((m) => m[1]),
    h2: Array.from(htmlContent.matchAll(h2Regex)).map((m) => m[1]),
    h3: Array.from(htmlContent.matchAll(h3Regex)).map((m) => m[1]),
  };
}

/**
 * 4. OTIMIZAR ALT TAGS DE IMAGENS
 */
export function optimizeImageAltTags(htmlContent: string, title: string): string {
  let imageIndex = 0;
  return htmlContent.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (match) => {
    imageIndex++;
    if (!match.includes('alt="')) {
      const altText = `${title} - Dr. Saullo Gomes - Imagem ${imageIndex}`;
      return match.replace(/>$/, ` alt="${altText}">`);
    }
    return match;
  });
}

/**
 * 5. STRIP HTML PARA META DESCRIPTION
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

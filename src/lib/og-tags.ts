/**
 * Utility to inject Open Graph meta tags into document head
 * Used for SSR and dynamic metadata injection
 */

export interface OpenGraphMetadata {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  author: string;
  publishedAt: string;
  type?: "article" | "website";
}

export const injectOpenGraphTags = (metadata: OpenGraphMetadata) => {
  const baseMetaTags = [
    { property: "og:type", content: metadata.type || "article" },
    { property: "og:title", content: metadata.title },
    { property: "og:description", content: metadata.description },
    { property: "og:url", content: metadata.url },
    { property: "og:image", content: metadata.imageUrl },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: metadata.title },
    { property: "og:site_name", content: "voce saude" },
    { property: "og:locale", content: "pt_BR" },
    { property: "article:published_time", content: metadata.publishedAt },
    { property: "article:author", content: metadata.author },
    { property: "article:section", content: "Saúde e bem-estar" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: metadata.title },
    { name: "twitter:description", content: metadata.description },
    { name: "twitter:image", content: metadata.imageUrl },
    { name: "description", content: metadata.description },
    {
      name: "keywords",
      content: `${metadata.title}, saúde, bem-estar, hábitos saudáveis, qualidade de vida`,
    },
  ];

  baseMetaTags.forEach(({ property, name, content }) => {
    const attribute = property ? "property" : "name";
    const attributeValue = property || name;

    let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, attributeValue);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  });

  document.title = `${metadata.title} | Blog vocesaude`;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", metadata.url);
};

export const fetchBlogMetadata = async (
  slug: string
): Promise<OpenGraphMetadata | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-blog-metadata?slug=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return null;
};

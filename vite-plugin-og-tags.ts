import { Plugin } from 'vite'
import { createClient } from '@supabase/supabase-js'

/**
 * Vite plugin to inject Open Graph meta tags for blog posts
 * Works with both SSR and SPA by injecting meta tags into the HTML
 * for social media crawlers
 */

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  html_content: string
  created_at: string
  published: boolean
}

const extractFirstImage = (htmlContent: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/
  const match = htmlContent.match(imgRegex)
  return match ? match[1] : null
}

const generateMetaTagsHtml = (post: BlogPost, domain: string): string => {
  const firstImage = extractFirstImage(post.html_content)
  const imageUrl = firstImage || `${domain}/og-image-blog.png`
  const description = post.excerpt || post.html_content.substring(0, 160).replace(/<[^>]*>/g, '')
  const postUrl = `${domain}/blog/${post.slug}`

  return `
    <!-- Dynamic OG Tags for Blog Post -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(post.title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(post.title)}" />
    <meta property="og:site_name" content="Dr. Saullo Gomes" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="article:published_time" content="${post.created_at}" />
    <meta property="article:author" content="Dr. Saullo Gomes" />
    <meta property="article:section" content="Saúde" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(post.title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(post.title)}, saúde, bem-estar, performance, dr saullo gomes" />
    <link rel="canonical" href="${postUrl}" />`
}

const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

const isBot = (userAgent: string): boolean => {
  const botPatterns = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
    'viber',
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'discordbot',
    'applebot',
    'pinterest',
    'slackbot',
    'tumblr',
  ]
  const userAgentLower = userAgent.toLowerCase()
  return botPatterns.some((pattern) => userAgentLower.includes(pattern))
}

export default function vitePluginOgTags(): Plugin {
  let supabase: any
  let config: any

  return {
    name: 'vite-plugin-og-tags',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      // Initialize Supabase client
      const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
      const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

      if (supabaseUrl && supabaseKey) {
        supabase = createClient(supabaseUrl, supabaseKey)
      }
    },
    async transformIndexHtml(html, ctx) {
      // Get domain from environment or infer from request
      const domain = process.env.VITE_APP_URL || 'https://www.drsaullo.com.br'
      const userAgent = ctx.request?.headers?.['user-agent'] || ''
      const url = ctx.request?.url || ''

      // Always apply transformation for blog URLs (not just for bots)
      // This ensures meta tags are in the HTML from the start
      const blogPostMatch = url.match(/\/blog\/([a-zA-Z0-9\-_]+)/)

      if (blogPostMatch && supabase) {
        const slug = blogPostMatch[1]

        try {
          // Fetch blog post from Supabase
          const { data: post } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single()

          if (post) {
            const metaTagsHtml = generateMetaTagsHtml(post, domain)
            const title = `${post.title} | Dr. Saullo Gomes`

            // Remove old generic og tags and add new ones
            let modifiedHtml = html
              // Update title
              .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
              // Remove old og:title, og:description, og:image, og:url
              .replace(/<meta property="og:title"[^>]*>/i, '')
              .replace(/<meta property="og:description"[^>]*>/i, '')
              .replace(/<meta property="og:image"[^>]*>/i, '')
              .replace(/<meta property="og:url"[^>]*>/i, '')
              .replace(/<meta property="og:type"[^>]*>/i, '')
              .replace(/<meta property="article:[^>]*>/i, '')
              .replace(/<meta name="twitter:[^>]*>/i, '')
              .replace(/<link rel="canonical"[^>]*>/i, '')
              // Insert new meta tags before closing head
              .replace(/(<\/head>)/i, `${metaTagsHtml}\n    $1`)

            return modifiedHtml
          }
        } catch (error) {
          console.error('Error fetching blog post metadata:', error)
        }
      }

      return html
    },
  }
}

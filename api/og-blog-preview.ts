import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

/**
 * API Route for generating Open Graph previews for blog posts
 * This endpoint returns HTML with injected OG meta tags for social crawlers
 * 
 * Usage: /api/og-blog-preview?slug=blog-post-slug
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid slug parameter' })
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ error: 'Missing Supabase configuration' })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Fetch post from Supabase
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const blogPost = post as BlogPost

    // Extract metadata
    const firstImage = extractFirstImage(blogPost.html_content)
    const domain = process.env.VITE_APP_URL || 'https://www.doutorsaullo.com.br'
    const imageUrl = firstImage || `${domain}/og-image-blog.png`
    const description = (blogPost.excerpt || blogPost.html_content).replace(/<[^>]*>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim().slice(0,160)
    const postUrl = `${domain}/blog/${blogPost.slug}`
    const title = `${blogPost.title} | Doutor Saullo Blog`

    // Return metadata as JSON (can be used by external services)
    res.status(200).json({
      title,
      description,
      imageUrl,
      url: postUrl,
      author: 'Doutor Saullo',
      publishedAt: blogPost.created_at,
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

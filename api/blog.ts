import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

/**
 * API Route para servir páginas de blog com OG tags injetadas
 * Detecta crawlers sociais e injeta meta tags dinâmicas no HTML
 * Suporta: Facebook, LinkedIn, Twitter, WhatsApp, Telegram e outros
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

const isBotOrCrawler = (userAgent: string): boolean => {
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
    'vkshare',
    'rogerbot',
    'furl',
    'curl',
    'wget',
  ]
  return botPatterns.some(pattern => userAgent.toLowerCase().includes(pattern))
}

const generateMetaTagsHtml = (post: BlogPost, domain: string): string => {
  const firstImage = extractFirstImage(post.html_content)
  const imageUrl = firstImage || `${domain}/og-image-blog.png`
  const description = post.excerpt || post.html_content.substring(0, 160).replace(/<[^>]*>/g, '')
  const postUrl = `${domain}/blog/${post.slug}`

  return `
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(post.title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(post.title)}" />
    <meta property="og:site_name" content="Doutor Saullo" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="article:published_time" content="${post.created_at}" />
    <meta property="article:author" content="Doutor Saullo" />
    <meta property="article:section" content="Tecnologia" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(post.title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${postUrl}" />`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string
  const userAgent = req.headers['user-agent'] || ''
  const isBot = isBotOrCrawler(userAgent)

  if (!slug) {
    return res.status(404).send('Not Found')
  }

  try {
    // Usar valores do ambiente ou fallback (valores padrão para desenvolvimento)
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 
                       process.env.SUPABASE_URL || 
                       'https://rctrqntkfacxlweezbfu.supabase.co'
    
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 
                           process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase credentials')
      // Retorna HTML normal se não conseguir configurar
      try {
        const htmlPath = path.join(process.cwd(), 'dist', 'index.html')
        const html = fs.readFileSync(htmlPath, 'utf-8')
        res.setHeader('Content-Type', 'text/html')
        return res.send(html)
      } catch {
        return res.status(500).send('Configuration error')
      }
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Fetch post
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !post) {
      // Post não encontrado - retorna HTML normal para que React trate
      const htmlPath = path.join(process.cwd(), 'dist', 'index.html')
      const html = fs.readFileSync(htmlPath, 'utf-8')
      res.setHeader('Content-Type', 'text/html')
      return res.send(html)
    }

    const blogPost = post as BlogPost
    const domain = process.env.VITE_APP_URL || 'https://www.doutorsaullo.com.br'

    // Se for bot, injeta meta tags
    if (isBot) {
      const metaTags = generateMetaTagsHtml(blogPost, domain)
      const title = `${blogPost.title} | Doutor Saullo Blog`

      // Lê o HTML base
      const htmlPath = path.join(process.cwd(), 'dist', 'index.html')
      let html = fs.readFileSync(htmlPath, 'utf-8')

      // Remove meta tags genéricas e injeta novas
      html = html
        .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
        .replace(/<meta property="og:title"[^>]*>/i, '')
        .replace(/<meta property="og:description"[^>]*>/i, '')
        .replace(/<meta property="og:image"[^>]*>/i, '')
        .replace(/<meta property="og:url"[^>]*>/i, '')
        .replace(/<meta property="og:type"[^>]*>/i, '')
        .replace(/<meta property="article:[^>]*>/i, '')
        .replace(/<meta name="twitter:[^>]*>/i, '')
        .replace(/<link rel="canonical"[^>]*>/i, '')
        .replace(/(<\/head>)/i, `${metaTags}\n    $1`)

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
      return res.send(html)
    }

    // Para usuários normais, retorna HTML padrão
    const htmlPath = path.join(process.cwd(), 'dist', 'index.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
    return res.send(html)
  } catch (error) {
    console.error('Error:', error)
    const htmlPath = path.join(process.cwd(), 'dist', 'index.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    return res.send(html)
  }
}

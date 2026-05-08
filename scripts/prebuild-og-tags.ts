import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

/**
 * Script para pré-renderizar posts com OG tags dinâmicas
 * Executa antes do build e gera arquivos HTML estáticos
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rctrqntkfacxlweezbfu.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

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
    <link rel="canonical" href="${postUrl}" />`
}

async function main() {
  if (!SUPABASE_ANON_KEY) {
    console.warn('⚠️  SUPABASE_ANON_KEY não definida - pulando pré-renderização')
    return
  }

  try {
    console.log('🔨 Iniciando pré-renderização de posts...')
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Busca todos os posts publicados
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)

    if (error || !posts) {
      console.error('❌ Erro ao buscar posts:', error)
      return
    }

    console.log(`📝 Encontrados ${posts.length} posts publicados`)

    // Lê o HTML base
    const basePath = path.join(process.cwd(), 'dist', 'index.html')
    let baseHtml: string

    try {
      baseHtml = fs.readFileSync(basePath, 'utf-8')
    } catch {
      console.warn('⚠️  dist/index.html não encontrado - será criado durante o build')
      return
    }

    const domain = 'https://www.drsaullo.com.br'

    // Para cada post, cria um arquivo HTML com OG tags injetadas
    for (const post of posts as BlogPost[]) {
      try {
        const metaTags = generateMetaTagsHtml(post, domain)
        const title = `${post.title} | Dr. Saullo Gomes`

        // Injeta meta tags no HTML
        let postHtml = baseHtml
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

        // Cria diretório se não existir
        const postDir = path.join(process.cwd(), 'dist', 'blog', post.slug)
        fs.mkdirSync(postDir, { recursive: true })

        // Salva arquivo HTML
        const postPath = path.join(postDir, 'index.html')
        fs.writeFileSync(postPath, postHtml)

        console.log(`✅ ${post.slug}`)
      } catch (err) {
        console.error(`❌ Erro ao processar ${post.slug}:`, err)
      }
    }

    console.log('✨ Pré-renderização concluída!')
  } catch (err) {
    console.error('❌ Erro geral:', err)
    process.exit(1)
  }
}

main()

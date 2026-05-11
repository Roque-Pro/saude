import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Attempt to load .env into process.env when running locally (safe fallback)
try {
  const envPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8')
    envFile.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/)
      if (match) {
        const key = match[1]
        let val = match[2]
        // remove surrounding quotes if any
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        if (!process.env[key]) process.env[key] = val
      }
    })
  }
} catch (err) {
  // ignore
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rctrqntkfacxlweezbfu.supabase.co'
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

const domain = 'https://www.doutorsaullo.com.br'

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about-me', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/autoclub-pro', priority: '0.8', changefreq: 'monthly' },
  { path: '/diagnostico-gratuito', priority: '0.8', changefreq: 'monthly' },
]

async function generateSitemap() {
  if (!SUPABASE_ANON_KEY) {
    console.warn('⚠️  SUPABASE_ANON_KEY não definida - pulando geração de sitemap')
    return
  }

  try {
    console.log('🔨 Gerando sitemap.xml...')
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Busca todos os posts publicados
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, created_at, updated_at')
      .eq('published', true)

    if (error || !posts) {
      console.error('❌ Erro ao buscar posts:', error)
      return
    }

    console.log(`📝 Encontrados ${posts.length} posts publicados`)

    const today = new Date().toISOString().split('T')[0]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    // Add static routes
    staticRoutes.forEach(route => {
      xml += `
  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    })

    // Add blog posts
    posts.forEach(post => {
      const lastmod = (post.updated_at || post.created_at || today).split('T')[0]
      xml += `
  <url>
    <loc>${domain}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })

    xml += `
</urlset>`

    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    fs.writeFileSync(sitemapPath, xml)
    console.log(`✅ Sitemap gerado com sucesso em ${sitemapPath}`)

  } catch (err) {
    console.error('❌ Erro geral ao gerar sitemap:', err)
    process.exit(1)
  }
}

generateSitemap()

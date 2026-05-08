import fs from 'fs'
import path from 'path'

const distBlog = path.join(process.cwd(), 'dist', 'blog')
const reportDir = path.join(process.cwd(), 'reports')
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')

if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true })

function readHtml(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    return null
  }
}

const rows = []
rows.push(['slug','url','title','title_len','description','description_len','has_og_image','has_jsonld'])

const slugs = fs.existsSync(distBlog) ? fs.readdirSync(distBlog) : []
const today = new Date().toISOString().slice(0,10)

const sitemapUrls = [
  { loc: 'https://www.doutorsaullo.com.br/', lastmod: today, changefreq: 'daily', priority: '1.0' },
  { loc: 'https://www.doutorsaullo.com.br/about-me', lastmod: today, changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://www.doutorsaullo.com.br/blog', lastmod: today, changefreq: 'daily', priority: '0.9' }
]

for (const slug of slugs) {
  const index = path.join(distBlog, slug, 'index.html')
  const html = readHtml(index)
  if (!html) continue

  const ogTitleMatch = html.match(/<meta property=\"og:title\" content=\"([^\"]*)\"/i)
  const metaTitleMatch = html.match(/<title>([^<]*)<\/title>/i)
  const title = (ogTitleMatch && ogTitleMatch[1]) || (metaTitleMatch && metaTitleMatch[1]) || ''

  const descMatch = html.match(/<meta name=\"description\" content=\"([^\"]*)\"/i)
  const description = (descMatch && descMatch[1]) || ''

  const hasOgImage = html.toLowerCase().includes('meta property="og:image"') || html.toLowerCase().includes("meta property='og:image'")
  const hasJsonLd = html.includes('type="application/ld+json"') || html.includes("type='application/ld+json'")

  const url = `https://www.doutorsaullo.com.br/blog/${slug}`

  rows.push([slug, url, title, String(title.length), description, String(description.length), hasOgImage ? 'yes' : 'no', hasJsonLd ? 'yes' : 'no'])

  sitemapUrls.push({ loc: url, lastmod: today, changefreq: 'monthly', priority: '0.7' })
}

const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(',')).join('\n')
fs.writeFileSync(path.join(reportDir, 'seo_report.csv'), csv, 'utf8')

// write sitemap
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for (const u of sitemapUrls) {
  sitemap.push('  <url>')
  sitemap.push(`    <loc>${u.loc}</loc>`)
  sitemap.push(`    <lastmod>${u.lastmod}</lastmod>`)
  sitemap.push(`    <changefreq>${u.changefreq}</changefreq>`)
  sitemap.push(`    <priority>${u.priority}</priority>`)
  sitemap.push('  </url>')
}
sitemap.push('</urlset>')
fs.writeFileSync(sitemapPath, sitemap.join('\n'), 'utf8')

console.log('Report generated:', path.join(reportDir, 'seo_report.csv'))
console.log('Sitemap updated:', sitemapPath)

// summary
console.log('Rows:', rows.length - 1)

process.exit(0)

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import sharp from 'sharp'

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, dest))
      }
      if (res.statusCode !== 200) return reject(new Error('Failed to download ' + url + ' status ' + res.statusCode))
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve(dest)))
      file.on('error', reject)
    }).on('error', reject)
  })
}

async function run() {
  const distBlog = path.join(process.cwd(), 'dist', 'blog')
  const outDir = path.join(process.cwd(), 'public', 'og')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  if (!fs.existsSync(distBlog)) {
    console.warn('dist/blog not found — run prebuild first')
    return
  }

  const slugs = fs.readdirSync(distBlog)
  for (const slug of slugs) {
    try {
      const idx = path.join(distBlog, slug, 'index.html')
      if (!fs.existsSync(idx)) continue
      const html = fs.readFileSync(idx, 'utf8')
      const m = html.match(/<meta property=(?:"|')og:image(?:"|')[^>]*content=(?:"|')([^"']+)(?:"|')/i)
      const imageUrl = m ? m[1] : null
      if (!imageUrl) continue

      const outFile = path.join(outDir, `${slug}.webp`)

      // skip if already exists (preserve old posts)
      if (fs.existsSync(outFile)) {
        console.log('skipping existing', slug)
        continue
      }

      // handle local paths
      if (imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
        const localSource = path.join(process.cwd(), imageUrl.replace(/^\//, ''))
        if (fs.existsSync(localSource)) {
          await sharp(localSource).resize(1200, 630, { fit: 'cover' }).webp({ quality: 80 }).toFile(outFile)
          console.log('generated from local', slug)
          continue
        }
      }

      // if remote URL, download to temp then resize
      if (imageUrl.startsWith('http')) {
        const tmp = path.join(outDir, `${slug}.tmp`)
        await download(imageUrl, tmp)
        await sharp(tmp).resize(1200, 630, { fit: 'cover' }).webp({ quality: 80 }).toFile(outFile)
        fs.unlinkSync(tmp)
        console.log('downloaded+generated', slug)
      }
    } catch (err) {
      console.error('error processing', slug, err.message || err)
    }
  }
  console.log('OG optimization done')
}

run()

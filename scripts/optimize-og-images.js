import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const src = path.join(process.cwd(), 'src', 'img', 'drsaulo.jpg')
const outPng = path.join(process.cwd(), 'public', 'og-image.png')
const outWebp = path.join(process.cwd(), 'public', 'og-image.webp')
const outBlogPng = path.join(process.cwd(), 'public', 'og-image-blog.png')

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src)
  process.exit(1)
}

async function run() {
  try {
    await sharp(src)
      .resize(1200, 630, { fit: 'cover' })
      .png({ quality: 80 })
      .toFile(outPng)

    await sharp(src)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outWebp)

    // also create blog fallback png (same as main)
    await sharp(src)
      .resize(1200, 630, { fit: 'cover' })
      .png({ quality: 80 })
      .toFile(outBlogPng)

    console.log('OG images generated:', outPng, outWebp, outBlogPng)
  } catch (err) {
    console.error('Error generating OG images:', err)
    process.exit(1)
  }
}

run()

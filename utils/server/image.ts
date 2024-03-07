import sharp from 'sharp'

export function resizeImage(buffer: ArrayBuffer | Buffer) {
  return sharp(buffer)
    .resize({ height: 512, width: 512, fit: 'contain' })
    .webp({ quality: 75 })
    .toBuffer()
}

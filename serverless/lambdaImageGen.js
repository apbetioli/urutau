const {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3')
const OpenAI = require('openai')
const sharp = require('sharp')

module.exports.handler = async (event) => {
  if (!event.id) {
    throw new Error('No id provided to generate image')
  }
  if (!event.subject) {
    throw new Error('No prompt provided to generate image')
  }

  console.log('Generating image')
  const buffer = await generateImage(event.subject)

  console.log('Resizing image')
  const resized = await resizeImage(buffer)

  console.log('Uploading image to S3')
  const url = await uploadImage(event.id, resized)

  return {
    statusCode: 200,
    body: JSON.stringify({
      url,
    }),
  }
}

async function generateImage(prompt) {
  const openai = new OpenAI()
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1024x1024',
    quality: 'standard',
    n: 1,
  })

  const image = await fetch(response.data[0].url)
  const arrayBuffer = await image.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function resizeImage(buffer) {
  return sharp(buffer)
    .resize({ height: 512, width: 512, fit: 'contain' })
    .webp({ quality: 75 })
    .toBuffer()
}

async function uploadImage(id, buffer) {
  if (!buffer) throw new Error('No buffer to upload image')

  const path = `images/${id}.webp`

  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: buffer,
    Key: path,
    ContentType: 'image/webp',
    ACL: ObjectCannedACL.public_read,
  }

  const s3Client = new S3Client()
  await s3Client.send(new PutObjectCommand(uploadParams))

  console.log(
    'Uploaded image to S3',
    `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`,
  )

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`
}

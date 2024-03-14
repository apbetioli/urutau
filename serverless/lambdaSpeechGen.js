const {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3')
const OpenAI = require('openai')

module.exports.handler = async (event) => {
  if (!event.id) {
    throw new Error('No id provided to generate speech')
  }
  if (!event.content) {
    throw new Error('No content provided to generate speech')
  }

  console.log('Generating speech')
  const buffer = await generateSpeech(event.content)

  console.log('Uploading speech to S3')
  const url = await uploadSpeech(event.id, buffer)

  return {
    statusCode: 200,
    body: url,
  }
}

async function generateSpeech(content) {
  const openai = new OpenAI()
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: content,
  })
  const arrayBuffer = await mp3.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function uploadSpeech(id, buffer) {
  if (!buffer) throw new Error('No buffer to upload speech')

  const path = `audio/${id}.mp3`

  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: buffer,
    Key: path,
    ContentType: 'audio/mpeg',
    ACL: ObjectCannedACL.public_read,
  }

  const s3Client = new S3Client()
  await s3Client.send(new PutObjectCommand(uploadParams))

  console.log(
    'Uploaded speech to S3',
    `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`,
  )

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`
}

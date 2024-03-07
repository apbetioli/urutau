import {
    DeleteObjectCommand,
    ObjectCannedACL,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { resizeImage } from './image'

export async function uploadImage(id: string, buffer?: Buffer) {
  if (!buffer) return

  const path = `images/${id}.webp`

  const resized = await resizeImage(buffer)

  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: resized,
    Key: path,
    ContentType: 'image/webp',
    ACL: ObjectCannedACL.public_read,
  }

  const s3Client = new S3Client({ region: process.env.AWS_REGION })
  await s3Client.send(new PutObjectCommand(uploadParams))

  console.log(
    'Uploaded image to S3',
    `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`,
  )

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`
}

export async function uploadSpeech(id: string, buffer?: Buffer) {
  if (!buffer) return

  const path = `audio/${id}.mp3`

  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: buffer,
    Key: path,
    ContentType: 'audio/mpeg',
    ACL: ObjectCannedACL.public_read,
  }

  const s3Client = new S3Client({ region: process.env.AWS_REGION })
  await s3Client.send(new PutObjectCommand(uploadParams))

  console.log(
    'Uploaded speech to S3',
    `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`,
  )

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${path}`
}

export async function deleteImage(id: string) {
  const deleteParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: `images/${id}.webp`,
  }

  const s3Client = new S3Client({ region: process.env.AWS_REGION })
  return s3Client.send(new DeleteObjectCommand(deleteParams))
}

export async function deleteSpeech(id: string) {
  const deleteParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: `audio/${id}.webp`,
  }

  const s3Client = new S3Client({ region: process.env.AWS_REGION })
  return s3Client.send(new DeleteObjectCommand(deleteParams))
}

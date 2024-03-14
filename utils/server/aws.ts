import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
  LogType,
} from '@aws-sdk/client-lambda'
import {
  DeleteObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'

export const invokeLambda = async (
  funcName: string,
  payload: any,
  type = InvocationType.Event, // asynchronous
) => {
  const client = new LambdaClient({ region: process.env.AWS_REGION })
  const command = new InvokeCommand({
    FunctionName: funcName,
    Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
    InvocationType: type,
  })
  console.log('Invoking lambda', funcName)
  const result = await client.send(command)
  console.log('Lambda response status', result.StatusCode)
  return { result }
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

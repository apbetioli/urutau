import { prisma } from '@/utils/server/db'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  const speech = await prisma.speech.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return new Response(speech.buffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
}

import { prisma } from '@/utils/server/db'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  const image = await prisma.image.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return new Response(image.buffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
    },
  })
}

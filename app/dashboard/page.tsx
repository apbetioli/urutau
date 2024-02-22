import { auth } from '@clerk/nextjs'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'

const getEntries = async () => {
  const user = await getUserByClerkId()

  return await prisma.entry.findMany({
    where: {
      userId: user!.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const entries = await getEntries()
  console.log(entries)

  return <div className="p-8">👋 Hi</div>
}

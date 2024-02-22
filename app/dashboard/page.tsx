import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import NewEntryCard from '@/components/NewEntryCard'
import { auth } from '@clerk/nextjs'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { redirect } from 'next/navigation'

const getEntries = async () => {
  const user = await getUserByClerkId()

  return await prisma.entry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })
}

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const entries = await getEntries()

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-5">Entries</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/dashboard/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

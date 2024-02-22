import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  return await prisma.entry.findUnique({
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
  })
}

export default async function EntryPage({ params }) {
  const entry = await getEntry(params.id)
  return (
    <div className="flex flex-col justify-end w-full h-full">
      {entry ? <Editor entry={entry} /> : 'Entry not found'}
    </div>
  )
}

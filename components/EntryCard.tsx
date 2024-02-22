import { Entry } from '@prisma/client'

type Props = {
  entry: Entry
}

export default function EntryCard({ entry }: Props) {
  const date = new Date(entry.createdAt).toLocaleDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-800 shadow">
      <div className="p-4">{date}</div>
      <div className="p-4">{entry.content}</div>
      <div className="p-4">{entry.analysis?.summary}</div>
      <div className="p-4">{entry.analysis?.mood}</div>
    </div>
  )
}

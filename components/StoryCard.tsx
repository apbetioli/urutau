import { Story } from '@prisma/client'

type Props = {
  story: Story
}

export default function StoryCard({ story }: Props) {
  const date = new Date(story.createdAt).toLocaleDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-800 shadow">
      <div className="p-4">{date}</div>
      <div className="p-4">{story.subject}</div>
    </div>
  )
}

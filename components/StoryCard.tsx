import Image from 'next/image'
import { Story } from '@prisma/client'

type Props = {
  story: Story & { image?: { id: string } }
  preview?: boolean
}

export default function StoryCard({ story, preview }: Props) {
  const date = new Date(story.createdAt).toLocaleDateString()
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      {story.image && (
        <Image
          className="object-cover w-full"
          src={`/api/image/${story.image.id}`}
          alt={story.subject}
          width={256}
          height={256}
        />
      )}

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            {date}
          </span>
          <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
            {story.subject}
          </p>
          {preview && (
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {story.content.slice(
                story.subject.length + 1,
                story.subject.length + 100,
              )}
              ...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

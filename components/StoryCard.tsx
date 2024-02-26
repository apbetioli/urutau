import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { Story } from '@prisma/client'
import { cn } from '@/utils/cn'

type Props = {
  story: Story & { image?: { id: string } }
  previewContent?: boolean
  className?: string
}

export default function StoryCard({
  story,
  previewContent: preview,
  className,
  children,
}: PropsWithChildren<Props>) {
  const date = new Date(story.createdAt).toLocaleDateString()
  return (
    <div
      className={cn(
        'w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800',
        className,
      )}
    >
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
        <span className="text-sm font-medium text-blue-600 uppercase dark:text-blue-400">
          {date}
        </span>
        <h3 className="mt-2 text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">
          {story.subject}
        </h3>
        {preview && (
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {story.content.slice(
              story.subject.length + 1,
              story.subject.length + 100,
            )}
            ...
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

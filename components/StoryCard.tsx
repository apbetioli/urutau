'use client'

import { Image, Speech, Story } from '@prisma/client'

import NextImage from 'next/image'
import { PropsWithChildren } from 'react'
import { cn } from '@/utils/cn'

type StoryWithMedia = Story & {
  speech?: Pick<Speech, 'id'>
  image?: Pick<Image, 'id'>
}

type Props = {
  story: StoryWithMedia
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
        <NextImage
          className="object-cover w-full"
          src={`/api/story/${story.id}/image`}
          alt={story.subject}
          width={1024}
          height={1024}
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
            {story.content.slice(0, 100)}
            ...
          </p>
        )}
        {!preview && story.speech && (
          <audio
            className="mt-3"
            controls
            src={`/api/story/${story.id}/speech`}
          />
        )}
        {children}
      </div>
    </div>
  )
}

'use client'

import { Story, User } from '@prisma/client'

import { cn } from '@/utils/cn'
import NextImage from 'next/image'
import { PropsWithChildren } from 'react'

type StoryWithUser = Story & {
  user?: Pick<User, 'name'>
}

type Props = {
  story: StoryWithUser
  className?: string
}

export default function StoryCard({
  story,
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
      {story.image_url && (
        <NextImage
          className="object-cover w-full"
          src={story.image_url}
          alt={story.subject}
          width={512}
          height={512}
        />
      )}

      <div className="p-6">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {date} {story.user?.name && ` - Created by ${story.user?.name}`}
        </span>
        <h3 className="mt-2 text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">
          {story.subject}
        </h3>

        {children}
      </div>
    </div>
  )
}

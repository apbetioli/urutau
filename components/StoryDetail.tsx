'use client'

import { Story } from '@prisma/client'
import StoryCard from './StoryCard'

type Props = {
  story: Story
  edit?: boolean
}

export default function StoryDetail({ story }: Props) {
  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-8 mt-5">
      <StoryCard story={story}>
        <main className="mt-8">
          {story.content.split('\n').map((paragraph, index) => {
            return (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            )
          })}
        </main>
      </StoryCard>
    </div>
  )
}

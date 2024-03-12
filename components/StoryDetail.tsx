'use client'

import { updateStory } from '@/utils/api'
import { Story } from '@prisma/client'
import { useState } from 'react'
import Button from './Button'
import StoryCard from './StoryCard'
import { Spinner } from './icons'

type Props = {
  story: Story
  edit?: boolean
}

export default function StoryDetail({ story }: Props) {
  const [published, setPublished] = useState(story.public)
  const [isBusy, setBusy] = useState(false)

  const publish = async () => {
    setBusy(true)
    try {
      const { data } = await updateStory(story.id, {
        public: !published,
      })
      setPublished(data.public)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-8 mt-5">
      <Button disabled={isBusy} onClick={publish}>
        {isBusy && <Spinner />}
        {published ? 'Make story private' : 'Publish to public feed'}
      </Button>
      <StoryCard story={story}>
        {story.speech_url && (
          <audio className="my-8" controls src={story.speech_url} />
        )}
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

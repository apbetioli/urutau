'use client'

import Button from '@/components/Button'
import { Spinner } from '@/components/icons'
import { createStory } from '@/utils/api'
import useLanguage from '@/utils/useLanguage'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewStory() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [language] = useLanguage()
  const router = useRouter()

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsGenerating(true)
    try {
      const { data } = await createStory(prompt, language)
      router.push(`/stories/${data.id}`)
    } catch (e) {
      console.error(e)
      setIsGenerating(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-2 bg-purple-950 p-4 rounded-lg"
      onSubmit={generate}
    >
      <label htmlFor="context">What`s your new story about?</label>
      <input
        id="context"
        type="text"
        disabled={isGenerating}
        value={prompt}
        placeholder="two little hamsters go to the moon"
        onChange={(e) => setPrompt(e.target.value)}
        required
        size={100}
      />

      <Button disabled={isGenerating} type="submit">
        {isGenerating && <Spinner />}
        {isGenerating ? 'Generating story... Please wait' : 'Generate story'}
      </Button>
    </form>
  )
}

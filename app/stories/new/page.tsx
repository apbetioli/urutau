'use client'

import Button from '@/components/Button'
import { Spinner } from '@/components/icons'
import { createStory } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewStoryPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('English')
  const router = useRouter()

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsGenerating(true)
    try {
      const { data } = await createStory(prompt, language)
      router.push(`/stories/${data.id}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const languages = ['English', 'Portuguese', 'Spanish', 'French']

  return (
    <div className="w-full h-full flex flex-col p-8">
      <form
        className="mx-auto lg:w-1/2 justify-center flex flex-col gap-2"
        onSubmit={generate}
      >
        <label htmlFor="context">What`s your story about?</label>
        <input
          id="context"
          type="text"
          disabled={isGenerating}
          value={prompt}
          placeholder="two little hamsters on vacation"
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <label htmlFor="language">Select your language</label>
        <select
          disabled={isGenerating}
          value={language}
          className="mb-3"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} label={lang} />
          ))}
        </select>
        <Button disabled={isGenerating} type="submit">
          {isGenerating && <Spinner />}
          {isGenerating ? 'Generating story... Please wait' : 'Generate story'}
        </Button>
      </form>
    </div>
  )
}

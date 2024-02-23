'use client'

import Loading from '@/app/loading'
import { newStory } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewStoryPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('English')
  const router = useRouter()

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const { data } = await newStory(prompt, language)
      router.push(`/stories/${data.id}`)
    } finally {
      setIsLoading(false)
    }
  }

  const languages = ['English', 'Portuguese', 'Spanish', 'French']

  return (
    <div className="w-full h-full flex flex-col p-8">
      <form
        className="w-full lg:w-1/2 justify-center flex flex-col"
        onSubmit={generate}
      >
        <label htmlFor="context" className="mb-2">
          What`s your story about?
        </label>
        <input
          id="context"
          type="text"
          disabled={isLoading}
          value={prompt}
          placeholder="two little hamsters on vacation"
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <label htmlFor="language" className="mb-2">
          Select your language
        </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang} value={lang} label={lang} />
          ))}
        </select>
        <button
          disabled={isLoading}
          className="bg-primary-600 rounded-sm mt-5 py-2"
          type="submit"
        >
          Generate story
        </button>
        <div className="p-8">{isLoading && <Loading />}</div>
      </form>
    </div>
  )
}

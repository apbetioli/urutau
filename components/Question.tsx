'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

export default function Question() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnswer('')

    try {
      setLoading(true)
      const { data: answer } = await askQuestion(question)
      setAnswer(answer)
      setQuestion('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          placeholder="Ask a question"
          className="p-2 border text-black mr-1 rounded-lg text-lg"
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-xl text-white"
        >
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p>{answer}</p>}
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function Question() {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Ask a question"
        className="p-2 border text-black mr-1 rounded-lg text-lg"
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-primary-600 px-4 py-2 rounded-lg text-xl text-white"
      >
        Ask
      </button>
    </form>
  )
}

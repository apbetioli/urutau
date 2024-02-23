import { Story } from '@prisma/client'

export const newStory = async (prompt: string, language?: string) => {
  const res = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, language }),
  })
  if (res.ok) {
    return await res.json()
  }
}

export const updateStory = async (id: string, story: Partial<Story>) => {
  const res = await fetch(`/api/story/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(story),
  })
  if (res.ok) {
    return await res.json()
  }
}

export const generateSpeech = async (id: string) => {
  const res = await fetch(`/api/story/${id}/speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  if (res.ok) {
    return await res.json()
  }
}

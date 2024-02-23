import { Story } from "@prisma/client"

export const newStory = async (prompt: string) => {
  const res = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
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

export const askQuestion = async (question: string) => {
  const res = await fetch('/api/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })
  if (res.ok) {
    return await res.json()
  }
}

import { Story } from '@prisma/client'

export const getStories = async (skip?: number, take = 5, feed = false) => {
  const params = new URLSearchParams()
  if (skip) params.set('skip', String(skip))
  if (take) params.set('take', String(take))
  if (feed) params.set('feed', String(feed))

  const res = await fetch(`/api/stories?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.ok) {
    return await res.json()
  }
}

export const createStory = async (prompt: string, language?: string) => {
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

export const generateImage = async (id: string) => {
  const res = await fetch(`/api/story/${id}/image`, {
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

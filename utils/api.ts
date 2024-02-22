export const newEntry = async () => {
  const res = await fetch('/api/entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  if (res.ok) {
    const json = await res.json()
    return json
  }
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(`/api/entry/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
  if (res.ok) {
    const json = await res.json()
    return json
  }
}

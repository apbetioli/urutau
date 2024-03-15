import { generateStory } from '@/utils/server/ai'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@langchain/openai', () => {
  return {
    OpenAI: function () {
      return {
        invoke: (prompt: string) => prompt,
      }
    },
  }
})

describe('OpenAI client', () => {
  it('should truncate the prompt', async () => {
    const story = await generateStory(
      'Two hamsters going to the moon',
      'English',
      10,
    )
    expect(story).toStrictEqual({
      prompt: 'Two hamsters going to the moon',
      subject: 'Two hamste',
      content: `Create a new story in English about Two hamste, and define the title as the first line`,
    })
  })
})

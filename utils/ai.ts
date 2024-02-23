import { OpenAI as LangChainOpenAI } from '@langchain/openai'
import OpenAI from 'openai'

export const createStory = async (
  userPrompt: string,
  language: string = 'English',
) => {
  const model = new LangChainOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const prompt = `Create a new bedtime story in ${language} about ${userPrompt}, and define the title as the first line`

  const content = await model.invoke(prompt)
  return {
    content,
    subject: content.split('\n')[0],
    prompt: userPrompt,
  }
}

export const tts = async (content: string) => {
  const openai = new OpenAI()
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'onyx',
    input: content,
  })
  const bytes = await mp3.arrayBuffer()
  return Buffer.from(bytes)
}

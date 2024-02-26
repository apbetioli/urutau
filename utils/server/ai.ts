import { OpenAI as LangChainOpenAI } from '@langchain/openai'
import OpenAI from 'openai'

export const generateSpeech = async (content: string) => {
  const openai = new OpenAI()
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: content,
  })
  const bytes = await mp3.arrayBuffer()
  return Buffer.from(bytes)
}

export const generateImage = async (prompt: string) => {
  const openai = new OpenAI()
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1024x1024',
    quality: 'standard',
    n: 1,
  })

  const image = await fetch(response.data[0].url!)
  return Buffer.from(await image.arrayBuffer())
}

export const generateStory = async (
  prompt: string,
  language: string = 'English',
) => {
  const model = new LangChainOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const refinedPrompt = `Create a new story in ${language} about ${prompt}, and define the title as the first line`
  let content = await model.invoke(refinedPrompt)
  const subject = content.split('\n')[0]
  content = content.substring(subject.length + 1).trim()

  return {
    content,
    subject,
    prompt,
  }
}

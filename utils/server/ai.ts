import { OpenAI } from '@langchain/openai'

export const generateStory = async (
  prompt: string,
  language: string = 'English',
) => {
  const model = new OpenAI({
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

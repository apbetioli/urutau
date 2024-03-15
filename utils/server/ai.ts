import { OpenAI } from '@langchain/openai'

export const generateStory = async (
  prompt: string,
  language: string = 'English',
  truncateSize = 100,
) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const truncatedPrompt = prompt.slice(0, truncateSize)
  const refinedPrompt = `Create a new story in ${language} about ${truncatedPrompt}, and define the title as the first line`
  let content = await model.invoke(refinedPrompt)
  let subject = content.split('\n')[0]
  if (subject.includes('.') || subject.length > truncateSize) {
    // Sometimes the AI doesn't return the subject as the first line
    subject = truncatedPrompt
  } else {
    content = content.substring(subject.length + 1).trim()
  }
  return {
    content,
    subject,
    prompt,
  }
}

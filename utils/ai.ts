import { OpenAI as LangChainOpenAI, OpenAIEmbeddings } from '@langchain/openai'

import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import OpenAI from 'openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { Story } from '@prisma/client'
import { StructuredOutputParser } from 'langchain/output_parsers'
import fs from 'fs'
import { loadQARefineChain } from 'langchain/chains'
import path from 'path'
import { z } from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('A quick summary of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e. does it contain negative emotions?)'
      ),
    subject: z.string().describe('The subject of the journal entry.'),
    color: z
      .string()
      .describe(
        'A hexidecimal color code that representes the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const createStructuredPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  return await prompt.format({ entry: content })
}

export const createStory = async (userPrompt: string) => {
  const model = new LangChainOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const prompt = `Create a new story about ${userPrompt}, and define the title as the first line`
  const content = await model.invoke(prompt)
  return {
    content,
    subject: content.split('\n')[0],
    prompt: userPrompt,
  }
}

export const tts = async (content: string) => {
  const openai = new OpenAI()
  console.log('Generating speech')
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: content,
  })
  console.log('Generated speech')
  const bytes = await mp3.arrayBuffer()
  return Buffer.from(bytes)
}

export const analyze = async (content: string) => {
  const model = new LangChainOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })

  const prompt = await createStructuredPrompt(content)
  const result = await model.invoke(prompt)
  console.log(result)
  try {
    return parser.parse(result)
  } catch (e) {
    console.error('Failed to parse the result from the AI.', e)
  }
}

export const qa = async (question: string, stories: Partial<Story>[]) => {
  const docs = stories.map(
    (entry) =>
      new Document({
        pageContent: entry.content!,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new LangChainOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}

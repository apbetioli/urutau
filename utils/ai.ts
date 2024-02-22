import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'

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
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  return await prompt.format({ entry: content })
}

export const analyze = async (content: string) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })

  const prompt = await getPrompt(content)
  const result = await model.invoke(prompt)
  console.log(result)
  try {
    return parser.parse(result)
  } catch (e) {
    console.error('Failed to parse the result from the AI.', e)
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { configuration } from '../../utils/constants'
import { OpenAIApi } from 'openai'

type Data = {
  result: string
}

const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { input } = req.body
  console.log('input', input)

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `You are an expert in copywriting; write me an email copy for: '${input}.'\n\nThis is the email copy we came up with:`,
    temperature: 0.60,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const suggestion = response.data?.choices?.[0].text

  if (suggestion === undefined) throw new Error('No suggestion found')

  res.status(200).json({ result: suggestion })
}

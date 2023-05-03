
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler({req, res}: any) {
    console.log(req.body)
  const prompt = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });

}

function generatePrompt(song: any) {
  return `What is the key, tempo, and chords of redbone. Please list the results out in seperate lines.`;
}
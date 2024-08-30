'use server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export default async function translateDocument(
    error: string | undefined,
    formData: FormData
) {
    try {
        const htmlString = formData.get('file')
        const { text, usage: tokenUsage } = await generateText({
            model: openai('gpt-3.5-turbo'),
            prompt:
                'Translate all text contents of this html to English. Do not ommit anything: \n\n' +
                `${htmlString}`,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
}

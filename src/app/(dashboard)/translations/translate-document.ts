'use server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { db } from '@/drizzle/index'
import { translations } from '@/drizzle/schema'
import { splitHtmlDocument } from '@/lib/split-html-document'
import s3 from '@/lib/aws-s3'
import { auth } from '@/lib/auth'
import z from 'zod'
import { languages } from '@/constants'
import { redirect } from 'next/navigation'

export type FormValues = {
    file: File
    language: string
}

export default async function translateDocument(
    error: string | undefined,
    formData: FormData
) {
    const translationId = crypto.randomUUID()
    try {
        const session = await auth()
        if (!session) return 'Unauthenticated'
        const file = formData.get('file')
        if (!(file instanceof File)) return 'Invalid file'
        const fileArrayBuffer = await file.arrayBuffer()
        const htmlString = Buffer.from(fileArrayBuffer).toString('utf-8')

        const languageValidation = z
            .enum(languages, { required_error: 'Language is required' })
            .safeParse(formData.get('language'))
        if (languageValidation.error) {
            return 'Language not supported'
        }
        const language = languageValidation.data
        const [beforeBody, body, afterBody] = splitHtmlDocument(htmlString)

        const { text, usage: tokenUsage } = await generateText({
            model: openai('gpt-4o-mini'),
            system: 'You are a bot that translates all text from html to a specific language. Do not return anything else. You must respond with only the html text.',
            prompt: `Html: \n\n` + `${body}`,
        })
        const key = crypto.randomUUID()
        const blob = new Blob([beforeBody + text + afterBody], {
            type: 'text/html',
        })
        const buffer = await blob.arrayBuffer()
        await s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            Body: Buffer.from(buffer),
            ContentType: 'text/html',
        })

        await db.insert(translations).values({
            id: translationId,
            key,
            fileSize: blob.size,
            name: file.name,
            userId: session.user.id,
            language,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    redirect('/translations/' + translationId)
}

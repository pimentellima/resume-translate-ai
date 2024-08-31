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

const schema = z.object({
    language: z.enum([
        'enUS',
        'enGB',
        'esES',
        'esMX',
        'frFR',
        'deDE',
        'itIT',
        'ptPT',
        'ptBR',
        'ruRU',
        'jaJP',
        'koKR',
        'zhCN',
        'zhTW',
        'arSA',
        'hiIN',
        'nlNL',
        'svSE',
        'fiFI',
        'noNO',
    ]),
    htmlString: z.string(),
    resumeId: z.string().uuid(),
})

export default async function translateDocument(
    error: string | undefined,
    formData: FormData
) {
    const translationId = crypto.randomUUID()
    try {
        const session = await auth()
        if (!session) return 'Unauthenticated'
        const validation = schema.safeParse({
            language: formData.get('language'),
            resumeId: formData.get('resumeId'),
            htmlString: formData.get('htmlString'),
        })
        if (validation.error) {
            return 'Error validating values'
        }
        const { htmlString, language, resumeId } = validation.data
        const [beforeBody, body, afterBody] = splitHtmlDocument(htmlString)

        const { text, usage: tokenUsage } = await generateText({
            model: openai('gpt-3.5-turbo'),
            prompt:
                `Translate all text contents of this html to ${language}. \n\n` +
                `${body}`,
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
            resumeId,
            fileSize: blob.size,
            userId: session.user.id,
            language,
        })
    } catch (e) {
        console.log(e)
        return 'An error occurred'
    }
    redirect('/translations/' + translationId)
}

import 'server-only'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import z from 'zod'

const locationSchema = z.object({
    city: z.string(),
    state: z.string(),
})

const resumeSchema = z.object({
    name: z.string(),
    jobTitle: z.string().optional(),
    summarySection: z
        .object({
            sectionTitle: z.string(),
            text: z.string(),
        })
        .optional(),
    location: locationSchema.optional(),
    contact: z
        .object({
            phoneNumber: z.string().optional(),
            email: z.string().email().optional(),
            linkedin: z.string().optional(),
        })
        .optional(),
    skillsSection: z
        .object({
            skills: z.array(z.string()),
            sectionTitle: z.string(),
        })
        .optional(),
    projectsSection: z
        .object({
            projects: z.array(
                z.object({
                    title: z.string(),
                    date: z.string().optional(),
                    contributions: z.array(z.string()),
                })
            ),
            sectionTitle: z.string(),
        })
        .optional(),
    educationSection: z
        .object({
            sectionTitle: z.string(),
            universityName: z.string(),
            title: z.string().optional(),
            date: z.string().optional(),
            contributions: z.array(z.string()).optional(),
        })
        .optional(),
    experienceSection: z.object({
        sectionTitle: z.string(),
        experiences: z.array(
            z
                .object({
                    jobTitle: z.string(),
                    date: z.string().optional(),
                    companyName: z.string(),
                    remote: z.boolean(),
                    location: locationSchema.optional(),
                    contributions: z.array(z.string()),
                })
                .describe('If remote is true, location should be empty.')
        ),
    }),
})

export type Resume = z.infer<typeof resumeSchema>

export async function generateResumeObject(text: string, language?: string) {
    const { object, usage: tokenUsage } = await generateObject({
        model: openai('gpt-4o-mini'),
        system: language
            ? 'You are a bot that takes a text extracted from a resume, translate the text to a specific language and generate a resume object. Text must be 1st person.'
            : 'You are a bot that takes a text extracted from a resume and generate a resume object. Text must be 1st person.',
        prompt: `Text: \n\n ${text} ${
            language && '\n\n Language: ' + language
        }`,
        schema: resumeSchema,
    })

    return object
}
import 'server-only'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import z from 'zod'
import { extractTextFromPdf } from './extract-text-from-pdf'

const locationSchema = z.object({
    city: z.string(),
    state: z.string(),
})

const resumeSchema = z.object({
    name: z.string(),
    jobTitle: z.string(),
    summarySection: z.object({
        sectionTitle: z.string(),
        text: z.string(),
    }),
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
            title: z.string(),
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

export async function generateTranslatedResumeObject(
    file: File,
    language: string
) {
    const result = await extractTextFromPdf(file)
    const { object, usage: tokenUsage } = await generateObject({
        model: openai('gpt-4o-mini'),
        system: 'You are a bot that takes a text extracted from a resume, translate the text to a specific language and generate a resume object.',
        prompt: `Text: \n\n ${result.text} \n\n Language: ${language}`,
        schema: resumeSchema,
    })

    return object
}

const testResume = {
    name: 'Matheus Pimentel',
    jobTitle: 'React.js and Node.js Developer',
    summary:
        'Developer specialized in React and Node with a focus on growing in the web development area.',
    location: {
        city: 'Sergipe',
        state: 'Brazil',
    },
    contact: {
        phoneNumber: '(75) 99169-8122',
        email: 'matheus_dere@hotmail.com',
    },
    skills: [
        'React',
        'Node.js',
        'JavaScript',
        'TypeScript',
        'Vite.js',
        'Tailwind CSS',
        'Swagger',
        'Adonis.js',
        'MongoDB',
        'Google Cloud Storage',
        'Redis',
        'OpenAI API',
        'NextAuth',
        'Stripe',
        'PostgreSQL',
    ],
    projects: [
        {
            title: 'Social Media Content Aggregation Platform',
            date: 'August 2024',
            contributions: [
                'Developed pages and API using Tailwind and Next.js.',
                'Integrated with external APIs using OAuth 2.0 protocol to obtain user information from other platforms.',
                'Used Redis to store responses from external APIs.',
            ],
        },
        {
            title: 'AI Prototype Data Generator',
            date: 'July 2024',
            contributions: [
                'Utilized OpenAI API to generate realistic prototyping data from TypeScript types using AI.',
                'Implemented user authentication using NextAuth.',
                'Integrated with Stripe to handle credit purchase payments within the app.',
                'Used PostgreSQL to store user information and generated responses from each submission.',
            ],
        },
    ],
    education: {
        universityName: 'Federal University of Sergipe',
        title: 'Bachelor in Computer Science',
        date: 'June 2021—Present',
    },
    experience: [
        {
            jobTitle: 'React and Node Developer',
            date: 'January 2024—Present',
            companyName: 'DPSystem',
            remote: true,
            contributions: [
                'Implemented financial report generation for administrators with daily cash flow and billing by profession and developed the bank reconciliation module of the system.',
                'Developed the recovery flow of the account.',
                'Worked on API documentation using Swagger.',
            ],
        },
        {
            jobTitle: 'Junior React Developer',
            date: 'April 2023—January 2024',
            companyName: 'DPSystem',
            remote: true,
            contributions: [
                'Participated in the refactoring of the Create-React-App from JavaScript to TypeScript, Vite.js, and Tailwind CSS.',
                "Created screens for appointment scheduling, viewing the professional's calendar, user registration, and system data registration, such as procedures, health plans, and stock products.",
                'Created a patient service screen, with the generation of personalized medical records and storage of patient history.',
                'Integrated the system with Google Cloud Storage for uploading patient images and user profile photos.',
                'Worked on building the API using Adonis.js and MongoDB following Clean Architecture standards.',
            ],
        },
    ],
}

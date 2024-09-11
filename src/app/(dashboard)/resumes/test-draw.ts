'use server'

import generateResume from '@/lib/draw-resume/generate-resume'
import { promises } from 'fs'

export async function testDraw() {
    const buffer = await generateResume(testPdf, 'metro')
    await promises.writeFile('test.pdf', buffer)
}

const testPdf = {
    name: 'Matheus Pimentel',
    jobTitle: 'Web Developer',
    summarySection: {
        sectionTitle: 'Profile',
        text: "I hold a Bachelor's degree in Computer Science with experience as a React and Node Analyst and Developer. I have advanced skills in Javascript, Typescript, and Node.js, and I am seeking an opportunity as a Web Developer.",
    },
    location: {
        city: 'Sergipe',
        state: 'Brazil',
    },
    contact: {
        phoneNumber: '+5575991698122',
        email: 'matheus_dere@hotmail.com',
        linkedin: 'https://linkedin.com/in/matheus-pimentel-7a427b259',
    },
    skillsSection: {
        skills: [
            'Node.js',
            'Typescript',
            'Tailwind CSS',
            'Adonis.js',
            'MongoDB',
            'Drizzle ORM',
            'Google Cloud Storage',
            'Javascript',
            'React',
            'Next.js',
            'PostgreSQL',
            'Redis',
            'AWS S3',
            'OAuth 2.0',
        ],
        sectionTitle: 'Skills',
    },
    educationSection: {
        sectionTitle: 'Education',
        universityName: 'Universidade Federal de Sergipe',
        title: "Bachelor's in Computer Science",
        date: 'Jun 2021 - Present',
    },
    experienceSection: {
        sectionTitle: 'Experience',
        experiences: [
            {
                jobTitle: 'React and Node Analyst and Developer',
                date: 'Jan 2024 - Present',
                companyName: 'DPSystem',
                remote: true,
                contributions: [
                    'Implemented financial report generation for administrators, including daily cash flow and revenue by professional, and developed the bank reconciliation module of the system.',
                    'Developed the account password recovery flow.',
                    'Worked on API documentation using Swagger.',
                ],
            },
            {
                jobTitle: 'Junior React Developer',
                date: 'Apr 2023 - Jan 2024',
                companyName: 'DPSystem',
                remote: true,
                contributions: [
                    'Participated in the refactoring of the Create-React-App and Javascript app to Typescript, Vite.js, and Tailwind CSS.',
                    'Created screens for appointment scheduling, professional calendar viewing, user registration, and system data registration, such as procedures, health plans, and stock products.',
                    'Developed the patient care screen, with personalized medical record generation and patient history storage.',
                    'Integrated the system with Google Cloud Storage for sending patient images and user profile photos.',
                    'Contributed to building the API using Adonis.js and MongoDB following Clean architecture standards.',
                ],
            },
        ],
    },
}

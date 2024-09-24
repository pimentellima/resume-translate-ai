import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './globals.css'
import SessionProvider from './session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Resume Translator',
    description: 'Translate resumes to different languages in seconds',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/logo.png" sizes="any" />
            <body className={inter.className}>
                <SessionProvider>
                    <>
                        <div className="flex flex-col min-h-screen">
                            {children}
                        </div>
                        <Toaster />
                    </>
                </SessionProvider>
            </body>
        </html>
    )
}

import { Button } from '@/components/ui/button'
import { LetterCaseCapitalizeIcon } from '@radix-ui/react-icons'
import { ArrowRight, Clock, FileIcon, FileText } from 'lucide-react'
import Link from 'next/link'
import LanguagesInfiniteScroll from './languages-infinite-scroll'
import FormSubmitFile from './form-submit-file'

export default function Home() {
    return (
        <main className="flex-1 scroll-smooth">
            <div className="px-64 pt-32 pb-20 text-left text-background bg-accent-foreground">
                <h1 className="font-serif text-6xl">
                    Translate your resume to any language
                </h1>
                <h2 className="w-4/5 leading-relaxed mt-7">
                    Globalize Your Resume with Precision. <br />
                    Ensure it's understood worldwide with precise AI-driven
                    translations.
                </h2>
                <div className="flex gap-2 mt-7">
                    <FormSubmitFile />
                    <Button
                        asChild
                        className="text-base"
                        size={'lg'}
                        variant={'ghost'}
                    >
                        <Link href={'sign-in'}>
                            Sign in to your account
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
                <div className="h-[700px] w-full rounded-md bg-background mt-20"></div>
            </div>
            <FeaturesSection />
            <GetStartedSection />
        </main>
    )
}

function FeaturesSection() {
    return (
        <section id="features" className="w-full py-32 border-b">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 mb-4 bg-blue-100 rounded-full">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Upload Resume
                        </h3>
                        <p className="text-gray-600">
                            Easily upload your resume in various formats for
                            AI-powered translation.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 mb-4 bg-green-100 rounded-full">
                            <LetterCaseCapitalizeIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            AI Translation
                        </h3>
                        <p className="text-gray-600">
                            Our advanced AI translates your resume into multiple
                            languages accurately.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 mb-4 bg-purple-100 rounded-full">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Instant Results
                        </h3>
                        <p className="text-gray-600">
                            Get your translated resume in seconds, ready for
                            international applications.
                        </p>
                    </div>
                </div>
                <div className="p-8 rounded-lg text-card-foreground bg-card">
                    <h2 className="mb-4 font-serif text-3xl">
                        Translate for Any Job Market
                    </h2>
                    <LanguagesInfiniteScroll />
                </div>
            </div>
        </section>
    )
}

function GetStartedSection() {
    return (
        <section
            id="get-started"
            className="flex flex-col items-center justify-center py-24 my-20 bg-card text-card-foreground"
        >
            <h2 className="font-serif text-5xl">Get started</h2>
            <h3 className="mt-6">
                Upload a resume and start translating. No credit card required.
            </h3>
            <Button className="mt-6 text-base" size={'lg'} variant={'default'}>
                Sign in for free
            </Button>
        </section>
    )
}


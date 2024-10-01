import { Button } from '@/components/ui/button'
import { LetterCaseCapitalizeIcon } from '@radix-ui/react-icons'
import { ArrowRight, Clock, FileText } from 'lucide-react'
import Link from 'next/link'
import LanguagesInfiniteScroll from './languages-infinite-scroll'
import FormSubmitFile from './form-submit-file'
import { Suspense } from 'react'
import DemoVideo from './demo-video'

export default function Home() {
    return (
        <div>
            <main className="flex-1 scroll-smooth">
                <div className="px-4 pt-16 pb-20 text-left sm:px-8 md:px-16 lg:px-32 xl:px-64 md:pt-32 text-background bg-accent-foreground">
                    <h1 className="font-serif text-5xl leading-[1.15] md:text-6xl">
                        Translate resumes to any language
                    </h1>
                    <h2 className="w-full leading-relaxed text-md md:w-4/5 mt-7 md:text-lg">
                        Globalize Your Resume with Precision. <br />
                        Ensure it's understood worldwide with precise AI-driven
                        translations.
                    </h2>
                    <div className="flex flex-col gap-2 md:flex-row mt-7">
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
                    <Suspense
                        fallback={
                            <div className="h-[400px] md:h-[700px] w-full rounded-md bg-background mt-10 md:mt-20" />
                        }
                    >
                        <DemoVideo />
                    </Suspense>
                </div>
            </main>
            <FeaturesSection />
            <GetStartedSection />
        </div>
    )
}

function FeaturesSection() {
    return (
        <section id="features" className="w-full py-16 md:py-32">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 mb-4 bg-blue-100 rounded-full">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold md:text-xl">
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
                        <h3 className="mb-2 text-lg font-semibold md:text-xl">
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
                        <h3 className="mb-2 text-lg font-semibold md:text-xl">
                            Instant Results
                        </h3>
                        <p className="text-gray-600">
                            Get your translated resume in seconds, ready for
                            international applications.
                        </p>
                    </div>
                </div>
                <div className="p-6 rounded-lg md:p-8 text-card-foreground bg-card">
                    <h2 className="mb-4 font-serif text-2xl md:text-3xl">
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
            className="flex flex-col items-center justify-center px-6 py-20 mb-20 md:py-52 bg-card"
        >
            <h2 className="font-serif text-3xl md:text-5xl">Get started</h2>
            <h3 className="mt-4 font-medium text-center md:mt-6 md:text-lg">
                Upload a resume and start translating. No credit card required.
            </h3>
            <Button className="mt-6 text-base" size={'lg'} variant={'default'}>
                Sign in for free
            </Button>
        </section>
    )
}

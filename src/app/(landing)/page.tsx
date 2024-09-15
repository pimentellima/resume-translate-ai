import { Button } from '@/components/ui/button'
import { LetterCaseCapitalizeIcon } from '@radix-ui/react-icons'
import { FileText, Clock } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { languages } from '../../lib/languages'
import LanguagesInfiniteScroll from './languages-infinite-scroll'

export default function Home() {
    return (
        <main className="flex-1 bg-accent-foreground">
            <div className="px-64 py-20 text-left text-background">
                <h1 className="font-serif text-6xl">
                    Translate your resume to any language
                </h1>
                <h2 className="w-4/5 leading-relaxed mt-7">
                    Globalize Your Resume with Precision. <br />
                    Ensure it's understood worldwide with precise AI-driven
                    translations.
                </h2>
                <div className="flex gap-2 mt-7">
                    <Button asChild size={'lg'}>
                        <Link href="/sign-in">Get started for free</Link>
                    </Button>
                </div>
                <div className="h-[700px] w-full rounded-md bg-background mt-20"></div>
            </div>
            <FeaturesSection />
        </main>
    )
}

function FeaturesSection() {
    return (
        <div className="w-full py-12 bg-gray-50">
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
                    <h2 className="mb-4 text-3xl font-bold">
                        Translate for Any Job Market
                    </h2>
                    <LanguagesInfiniteScroll />
                </div>
            </div>
        </div>
    )
}

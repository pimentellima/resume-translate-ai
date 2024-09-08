import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex-1 bg-accent-foreground">
            <div className="px-64 py-32 text-left text-background">
                <h1 className="font-serif text-6xl">
                    Translate your resume to any language
                </h1>
                <h2 className="w-4/5 leading-relaxed mt-7">
                    Ensure your resume is understood worldwide. <br />
                    Get accurate translations tailored to your skills and
                    experience, opening doors to global opportunities.
                </h2>
                <div className="flex gap-2 mt-7">
                    <Button asChild size={'lg'}>
                        <Link href="/sign-in">Get started for free</Link>
                    </Button>
                    <Button size={'lg'} variant={'ghost'}>
                        Check the demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
                <div className="h-[700px] w-full rounded-md bg-background mt-24"></div>
            </div>
        </main>
    )
}

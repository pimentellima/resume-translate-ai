import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex-1 bg-accent-foreground">
            <div className="text-left text-background py-32 px-64">
                <h1 className="text-6xl font-serif">
                    Translate your resume to any language
                </h1>
                <h2 className="leading-relaxed mt-7 w-4/5">
                    Ensure your resume is understood worldwide. <br />
                    Get accurate translations tailored to your skills and
                    experience, opening doors to global opportunities.
                </h2>
                <div className="mt-7 flex gap-2">
                    <Button asChild size={'lg'}>
                        <Link href="/sign-in">Get started for free</Link>
                    </Button>
                    <Button size={'lg'} variant={'ghost'}>
                        Check the demo
                        <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                </div>
                <div className="h-[700px] w-full rounded-md bg-background mt-24"></div>
            </div>
        </main>
    )
}

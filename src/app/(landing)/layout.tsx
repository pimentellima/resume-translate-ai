import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {children}
        </div>
    )
}

function Header() {
    return (
        <header
            className="sticky top-0 h-14 py-2 bg-background text-foreground w-full
        flex items-center justify-between px-4 sm:px-8 md:px-12 z-10"
        >
            <Button variant="link">
                <Link href={'/'}>Resume Translate</Link>
            </Button>
            <div className="flex gap-2">
                <Button variant="link">
                    <Link href={'/pricing'}>Pricing</Link>
                </Button>
                <Button variant="link">
                    <Link href={'/sign-in'}>Get started</Link>
                </Button>
            </div>
        </header>
    )
}

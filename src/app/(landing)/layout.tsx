import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
        </div>
    )
}

function Header() {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 h-14 bg-background text-foreground sm:px-8 md:px-12 scroll-smooth">
            <Button className="text-base" variant="link">
                <Link className="flex items-center" href={'/'}>
                    Home
                </Link>
            </Button>
            <div className="flex gap-2">
                <Button className="text-base" variant="link">
                    <Link href={'/pricing'}>Pricing</Link>
                </Button>
                <Button className="text-base" variant="link">
                    <Link href={'/sign-in'}>Get started</Link>
                </Button>
            </div>
        </header>
    )
}

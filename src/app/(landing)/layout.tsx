import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen pb-32 ">
            <Header />
            {children}
            <Footer />
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

function Footer() {
    return (
        <footer className="pt-10 mx-20 mt-32 border-t scroll-smooth">
            <div className="grid grid-cols-3 px-5">
                <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold ">Links</p>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="#get-started"
                    >
                        Get started
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="#features"
                    >
                        Features
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="/pricing"
                    >
                        Pricing
                    </Link>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold ">Legal</p>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="/privacy-policy"
                    >
                        Privacy policy
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="/tos"
                    >
                        Terms of service
                    </Link>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold ">Sign</p>
                    <Link
                        className="hover:underline underline-offset-4 w-max"
                        href="/sign-in"
                    >
                        Log in to your account
                    </Link>
                </div>
            </div>
        </footer>
    )
}

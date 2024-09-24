import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import MobileNav from './mobile-nav'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen pb-28 ">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

function Header() {
    return (
        <header className="flex items-center justify-between w-full h-16 px-4 font-medium bg-white border-b sm:px-8 md:px-12">
            <Link
                className="flex items-center hover:underline underline-offset-4"
                href={'/'}
            >
                Home
            </Link>
            <div className="z-50 hidden gap-7 md:flex">
                <Link
                    className="hover:underline underline-offset-4"
                    href={'/pricing'}
                >
                    Pricing
                </Link>
                <Link
                    href={'/sign-in'}
                    className="flex items-center hover:underline underline-offset-4"
                >
                    Get started
                    <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
            <div className="block md:hidden">
                <MobileNav />
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="px-3 pt-10 border-t md:px-20 scroll-smooth">
            <div className="grid grid-cols-2 px-5">
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
            </div>
        </footer>
    )
}

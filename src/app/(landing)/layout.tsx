import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import MobileNav from './mobile-nav'
import Image from 'next/image'

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
            <Link href={'/'} className="flex items-center gap-2">
                <Image
                    className=""
                    alt="logo"
                    src="/logo-dark.png"
                    width={35}
                    height={35}
                />
                <span className="font-serif font-semibold tracking-tighter">Resume Translate</span>
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
            <div className="grid grid-cols-3 grid-rows-2 text-sm gap-y-1">
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
                <Link
                    className="hover:underline underline-offset-4 w-max"
                    href="/sign-in"
                >
                    Sign in
                </Link>
                <Link
                    className="hover:underline underline-offset-4 w-max"
                    href="/privacy-policy"
                >
                    Privacy policy
                </Link>
            </div>
        </footer>
    )
}

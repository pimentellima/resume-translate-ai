'use client'

import { ArrowRight, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileNav() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <>
            <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                    <XIcon className="h-5" />
                ) : (
                    <MenuIcon className="h-5" />
                )}
            </button>
            <nav
                className={`${
                    menuOpen ? 'translate-y-16' : '-translate-y-full'
                } absolute top-0 z-10 overflow-hidden
                duration-500 flex gap-5 flex-col w-full left-0 transition-none
                items-start px-4 py-6 tracking-wide bg-white text-black`}
            >
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
            </nav>
        </>
    )
}

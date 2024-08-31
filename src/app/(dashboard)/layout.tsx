import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DropdownMenuAccount from './dropdown-menu-account'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    if (!session) {
        redirect('/sign-in')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-background text-foreground">
                {children}
            </div>
        </div>
    )
}

function Header() {
    return (
        <header
            className="sticky top-0 h-14 py-2 bg-card text-card-foreground w-full
        flex items-center justify-between px-4 sm:px-8 md:px-12 z-10"
        >
            <Button variant="link">
                <Link href={'/'}>Resume Translate</Link>
            </Button>
            <div className="flex gap-2">
                <Button variant="link">
                    <Link href={'/pricing'}>Resumes</Link>
                </Button>
                <Button variant="link">
                    <Link href={'/sign-in'}>Upgrade</Link>
                </Button>
                <DropdownMenuAccount />
            </div>
        </header>
    )
}

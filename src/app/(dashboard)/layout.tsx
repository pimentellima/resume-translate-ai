import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DropdownMenuAccount from './translations/dropdown-menu-account'

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
        <div className="flex flex-col min-h-screen">
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
            className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 h-14 bg-card text-card-foreground sm:px-8 md:px-12"
        >
            <Button variant="link">
                <Link href={'/'}>Resume Translate</Link>
            </Button>
            <div className="flex gap-2">
                <Button variant="link">
                    <Link href={'/translations'}>Translations</Link>
                </Button>
                <Button variant="link">
                    <Link href={'/upgrade'}>Upgrade</Link>
                </Button>
                <DropdownMenuAccount />
            </div>
        </header>
    )
}

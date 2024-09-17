import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DropdownMenuAccount from './resumes/dropdown-menu-account'
import SessionProvider from './session-provider'
import { auth } from '@/lib/auth'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SessionProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 bg-background text-foreground">
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}

async function Header() {
    const session = await auth()

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 h-14 bg-card text-card-foreground sm:px-8 md:px-12">
            <Button variant="link">
                <Link href={'/'}>Resume Translate</Link>
            </Button>
            <div className="flex gap-2">
                {!!session?.user && (
                    <>
                        <Button variant="link">
                            <Link href={'/resumes'}>Resumes</Link>
                        </Button>
                        <Button variant="link">
                            <Link href={'/upgrade'}>Upgrade</Link>
                        </Button>
                    </>
                )}
                <DropdownMenuAccount />
            </div>
        </header>
    )
}

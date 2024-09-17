import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DropdownMenuAccount from './resumes/dropdown-menu-account'
import SessionProvider from './session-provider'
import { auth } from '@/lib/auth'
import { SparklesIcon, StarsIcon, WandSparkles } from 'lucide-react'

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
            {!!session?.user ? (
                <Button className="text-base" variant="link" asChild>
                    <Link href={'/resumes'}>Resumes</Link>
                </Button>
            ) : (
                <div></div>
            )}

            <div className="flex">
                {!!session?.user && (
                    <Button className="text-base" variant="link" asChild>
                        <Link href={'/upgrade'} className="flex items-center">
                            <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />{' '}
                            Upgrade
                        </Link>
                    </Button>
                )}
                <div className="ml-2">
                    <DropdownMenuAccount />
                </div>
            </div>
        </header>
    )
}

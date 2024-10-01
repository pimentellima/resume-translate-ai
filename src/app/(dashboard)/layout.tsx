import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DropdownMenuAccount from './resumes/dropdown-menu-account'
import { auth } from '@/lib/auth'
import { SparklesIcon, StarsIcon, WandSparkles } from 'lucide-react'
import { getUserById } from '@/services/user'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    if (!session?.user) {
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

async function Header() {
    const session = await auth()
    const user = session?.user.id ? await getUserById(session.user.id) : null
    const subscription = user?.stripeSubscriptionId
        ? await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
        : null

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 border-b h-14 bg-card text-card-foreground sm:px-8 md:px-12">
            {!!session?.user ? (
                <Button className="text-base" variant="link" asChild>
                    <Link href={'/resumes'}>Resumes</Link>
                </Button>
            ) : (
                <div></div>
            )}

            <div className="flex">
                {!subscription && (
                    <Button className="text-base" variant="link" asChild>
                        <Link href={'/pricing'} className="flex items-center">
                            <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />{' '}
                            Upgrade
                        </Link>
                    </Button>
                )}
                <div className="ml-2">
                    {session?.user ? (
                        <DropdownMenuAccount />
                    ) : (
                        <Button>
                            <Link href={'/sign-in'}>Sign in</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

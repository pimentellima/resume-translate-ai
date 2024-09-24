import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import SignInOptions from '../../components/sign-in-options'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default async function SignInPage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}) {
    const session = await auth()

    if (session?.user) {
        redirect('/resumes')
    }

    return (
        <div className="flex items-center justify-center h-screen px-3 bg-background md:px-0">
            <Card className="w-full mx-2 md:w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign in</CardTitle>
                    <CardDescription>
                        {searchParams.redirect === 'resumes'
                            ? 'You will be redirected back to the resume page'
                            : searchParams.redirect === 'pricing'
                            ? 'You will be redirected back to the pricing page'
                            : 'Sign in to your account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInOptions />
                </CardContent>
            </Card>
        </div>
    )
}

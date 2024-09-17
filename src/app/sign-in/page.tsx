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
    const redirectUri = searchParams.redirect_uri

    if (session?.user) {
        redirect('/resumes')
    }

    return (
        <div className="flex items-center justify-center h-screen px-3 bg-background md:px-0">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Sign in to download resume
                    </CardTitle>
                    <CardDescription>
                        {redirectUri
                            ? 'You will be redirected to the download page'
                            : 'Sign in to your account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInOptions redirectUri={redirectUri} />
                </CardContent>
            </Card>
        </div>
    )
}

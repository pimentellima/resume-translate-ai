import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import SignInForm from './sign-in-form'

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
            <SignInForm redirectUri={redirectUri} />
        </div>
    )
}

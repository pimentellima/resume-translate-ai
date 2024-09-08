import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import SignInForm from './sign-in-form'

export default async function SignInPage() {
    const session = await auth()

    if (session?.user) {
        redirect('/translations')
    }

    return (
        <div className="flex items-center justify-center h-screen px-3 bg-background md:px-0">
            <SignInForm />
        </div>
    )
}

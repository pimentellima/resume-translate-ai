import { redirect } from 'next/navigation'
import { auth } from '../../lib/auth'
import SignInForm from './sign-in-form'

export default async function SignInPage() {
    const session = await auth()

    if (session?.user) {
        redirect('/translations')
    }

    return (
        <div className="bg-background flex justify-center items-center h-screen px-3 md:px-0">
            <SignInForm />
        </div>
    )
}
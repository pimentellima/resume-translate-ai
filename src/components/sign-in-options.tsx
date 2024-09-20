'use client'

import GithubIcon from '@/components/github-icon'
import GoogleIcon from '@/components/google-icon'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SignInOptions() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const redirect = searchParams.get('redirect')
    const error = searchParams.get('error')
    const callbackUrl =
        redirect === 'resumes'
            ? `${pathname}/resumes/${searchParams.get('resumeId')}`
            : redirect === 'pricing'
            ? `${pathname}/pricing`
            : undefined

    return (
        <div>
            <Button
                size={'lg'}
                onClick={() => signIn('google', { callbackUrl })}
                className="w-full mt-2"
            >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Sign in with Google
            </Button>
            <Button
                size={'lg'}
                onClick={() => signIn('github', { callbackUrl })}
                className="w-full mt-2"
            >
                <GithubIcon className="w-5 h-5 mr-2" />
                Sign in with Github
            </Button>

            {error && (
                <p className="mt-1 text-sm text-destructive">
                    An error occurred signing in
                </p>
            )}
        </div>
    )
}

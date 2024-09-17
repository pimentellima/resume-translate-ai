'use client'

import GithubIcon from '@/components/github-icon'
import GoogleIcon from '@/components/google-icon'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function SignInOptions({ redirectUri }: { redirectUri?: string }) {
    const params = useSearchParams()
    const error = params.get('error')

    return (
        <div>
            <Button
                size={'lg'}
                onClick={() => signIn('google', { callbackUrl: redirectUri })}
                className="w-full mt-2"
            >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Sign in with Google
            </Button>
            <Button
                size={'lg'}
                onClick={() => signIn('github', { callbackUrl: redirectUri })}
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

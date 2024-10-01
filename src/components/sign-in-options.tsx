'use client'

import GithubIcon from '@/components/github-icon'
import GoogleIcon from '@/components/google-icon'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'
import { ArrowRight } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { FormEvent, useState } from 'react'

export default function SignInOptions() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [email, setEmail] = useState('')
    const redirect = searchParams.get('redirect')
    const error = searchParams.get('error')
    let callbackUrl: undefined | string = undefined
    if (redirect === 'pricing') callbackUrl = `${pathname}/pricing`
    if (redirect === 'resumes')
        callbackUrl =
            process.env.NEXT_PUBLIC_URL +
            '/api/resumes/' +
            searchParams.get('resumeId')

    const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signIn('email', {
            email,
            callbackUrl,
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <Button
                size={'lg'}
                onClick={() => signIn('google', { callbackUrl })}
                className="w-full"
            >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Continue with Google
            </Button>
            <Button
                size={'lg'}
                onClick={() => signIn('github', { callbackUrl })}
                className="w-full"
            >
                <GithubIcon className="w-5 h-5 mr-2" />
                Continue with Github
            </Button>
            <div className="h-1 my-2 w-full bg-accent border" />
            <form onSubmit={handleSubmitEmail} className="contents">
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    autoComplete='email'
                    className="bg-white"
                    placeholder="pottsfield.pumpkin@unknownwoods.com"
                />
                <Button
                    type="submit"
                    size={'lg'}
                    className="w-full"
                    variant={'outline'}
                >
                    Continue with Email
                    <ArrowRight className="w-5 ml-1" />
                </Button>
            </form>
            {error && (
                <p className="mt-1 text-sm text-destructive">
                    An error occurred signing in
                </p>
            )}
        </div>
    )
}

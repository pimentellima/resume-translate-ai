import { db } from '@/drizzle/index'
import { users } from '@/drizzle/schema'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next'
import { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import * as z from 'zod'
import { ACCESS_TOKEN_TTL } from '../constants'
import { obtainAccessToken, refreshAccessToken } from '../services/tokens'

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email) return true
            
            if (account?.provider === 'google') {
                const existingUser = await db.query.users.findFirst({
                    where: eq(users.googleId, user.id),
                })
                if (!existingUser) {
                    const [newUser] = await db
                        .insert(users)
                        .values({ googleId: user.id })
                        .returning()
                    user.id = newUser.id
                }
            }

            return true
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.refreshToken = await obtainAccessToken(
                    token.sub as string
                )
                token.expiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL)
            }

            const expiresAt = token.expiresAt as Date

            if (new Date() < new Date(expiresAt)) {
                return token
            }

            return await refreshAccessToken(token as any)
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string
                session.user.name = token.name
                session.user.email = token.email
            }

            return session
        },
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    })

                    if (!user || !user.password) return null
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (passwordsMatch)
                        return {
                            id: user.id,
                        }
                }

                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
} satisfies AuthOptions

export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}

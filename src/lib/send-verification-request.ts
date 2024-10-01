import { SendVerificationRequestParams } from 'next-auth/providers/email'
import sendEmail from './send-email'

export const sendVerificationRequest = async (
    params: SendVerificationRequestParams
) => {
    let {
        identifier: email,
        url,
        provider: { from },
    } = params
    try {
        await sendEmail(
            email,
            'Login Link to your Account',
            '<p>Click the magic link below to sign in to your account:</p>\
               <p><a href="' +
                url +
                '"><b>Sign in</b></a></p>'
        )
    } catch (error) {
        console.log({ error })
    }
}

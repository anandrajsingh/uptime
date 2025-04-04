import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${process.env.NEXT_APP_URL}/new-verification?token=${token}`

    await resend.emails.send({
        from: `${process.env.RESEND_API_EMAIL}`,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) =>{
    const confirmationLink = `http://localhost:3000/new-password?token=${token}`

    await resend.emails.send({
        from: `${process.env.RESEND_API_EMAIL}`,
        to: email,
        subject: 'Reset Link',
        html: `<p>Click <a href="${confirmationLink}">here</a> to reset password</p>`
      });
}
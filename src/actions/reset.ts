"use server"

import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/mail"

export const reset = async(values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)
    if(!validatedFields.success) return { error: "Invalid Fields"}

    const { email } = validatedFields.data;

    const existinguser = await getUserByEmail(email)
    if(!existinguser) return { error: "Email does not exist"}

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Password reset email sent"}
}

"use server"
import { SignupSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const signup = async(values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values)

    if(!validatedFields.success) return {error: "Invalid Fields"}

    const {name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const existingUser = await getUserByEmail(email)
    if(existingUser) return {error: "Email already in use."}
    
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    console.log(user)

    return {success: "Email sent"}
}
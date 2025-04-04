import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import type { NextAuthConfig, User } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from 'bcryptjs'

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials: Partial<Record<string, unknown>>) {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null;

                    const correctPassword = await bcrypt.compare(password, user.password)
                    if (!correctPassword) return null

                    if(user){
                        const result: User = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image || null
                        }
                        return result;
                    }
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig
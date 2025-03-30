import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/error"
    },
    events: {
        async linkAccount({user}){
            db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}){

            if(account?.provider != "credentials") return true;

            if(user.id == null) return false
            const existingUser = await getUserById(user.id)
            if(!existingUser || !existingUser.emailVerified) return false;

            return true
        },
        async jwt({token}){
            if(!token.sub) return token;
            
            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;

            return token;
        },
        async session({token, session}){
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            return session
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig
})
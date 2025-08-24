import NextAuth from "next-auth";
import NextOptions from "./auth.config"

export const {signIn, signOut, auth, handlers} = NextAuth({
    ...NextOptions
})  
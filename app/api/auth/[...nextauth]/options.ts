import { NextAuthOptions } from 'next-auth'
import { pool } from '@/utils/db'
import GoogleProvider from 'next-auth/providers/google' 
import GithubProvider from 'next-auth/providers/github'
import { Adapter } from 'next-auth/adapters'
import PostgresAdapter from '@/utils/Adapter'
import { ExtendedSession, ExtendedUser } from '@/types/authtypes'
const options : NextAuthOptions = {
    adapter: PostgresAdapter(pool) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],

    callbacks: {
        async session({session, user}) {
            const extendedSession = session as ExtendedSession
            const extendedUser = user as ExtendedUser
            extendedSession.user = extendedUser

            return extendedSession 
        }
    }
}

export default options

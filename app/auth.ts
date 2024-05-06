import NextAuth from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

export const { handlers, signIn, signOut, auth } = NextAuth(options)

import NextAuth from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(options)

export { GET, POST, auth, signIn, signOut }

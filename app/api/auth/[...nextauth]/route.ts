import NextAuth from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

// const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut
// } = NextAuth(options)
const handler = NextAuth(options)

// export { GET, POST, auth, signIn, signOut }
// export { GET, POST, signIn, signOut }
export { handler as GET, handler as POST }

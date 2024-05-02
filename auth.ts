import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getToken, getUser } from './app/lib/actions'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize (credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          const user = await getUser(username, password)
          if (!user) return null

          try {
            const token = await getToken(username, password)

            cookies().set('access_token', token.access_token, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
              path: '/'
            })

            const passwordsMatch = await bcrypt.compare(
              password,
              user.hashed_password
            )

            if (passwordsMatch) return user
            return user
          } catch (error) {
            console.error('Failed to fetch token:', error)
            throw new Error('Failed to fetch token.')
          }
        }

        console.log('Invalid credentials')
        return null
      }
    })
  ]
})

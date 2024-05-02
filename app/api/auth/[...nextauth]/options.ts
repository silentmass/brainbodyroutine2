import { getToken, getUser } from '@/app/lib/auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export const options: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'your-awsome-password'
        }
      },
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

            if (!token) return null

            const passwordsMatch = await bcrypt.compare(
              password,
              user.hashed_password
            )

            if (passwordsMatch) {
              cookies().set('access_token', token.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/'
              })
              return user
            }
          } catch (error) {
            console.error('Failed to fetch token:', error)
            throw new Error('Failed to fetch token.')
          }
        }

        console.log('Invalid credentials')
        return null
      }
    })
  ],
  callbacks: {
    async signIn ({ credentials }) {
      console.log('Hello from signIn callback')
      return true
    }
  }
}

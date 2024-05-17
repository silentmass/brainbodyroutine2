import { getToken } from '@/app/lib/actions/auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { getUser } from '@/app/lib/actions/users'
import { revalidateTag } from 'next/cache'

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
      async authorize (credentials, request) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse({
            username: credentials.username,
            password: credentials.password
          })

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
    async signIn ({ user, account, profile, email, credentials }) {
      console.log(
        '############################# Hello from signIn callback #############################'
      )
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt ({ token, user, account, profile, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      revalidateTag('taskcategories')
      revalidateTag('taskcategory')
      revalidateTag('usertasks')
      revalidateTag('usertask')
      revalidateTag('usertask')
      revalidateTag('userdescriptionlists')
      revalidateTag('userdescriptionlist')
      revalidateTag('userdescriptions')
      revalidateTag('nullusertasks')
      revalidateTag('nullusertask')
      revalidateTag('nullusertask')
      revalidateTag('nulluserdescriptionlists')
      revalidateTag('nulluserdescriptionlist')
      revalidateTag('nulluserdescriptions')
      return token
    },
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id

      return session
    }
  }
}

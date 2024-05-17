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
          placeholder: 'your-awesome-password'
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
              return { ...user, access_token: token.access_token }
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
      // console.group('signIn callback')
      // console.log('user', user)
      // console.log('profile', profile)
      // console.groupEnd()

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

      if (
        account !== undefined &&
        account !== null &&
        user !== undefined &&
        token !== undefined
      ) {
        const fastAPIAccessToken =
          'access_token' in user && typeof user.access_token === 'string'
            ? user.access_token
            : ''

        if (fastAPIAccessToken.split('.').length === 3) {
          const tokenExp = new Date(
            JSON.parse(atob(fastAPIAccessToken.split('.')[1]))?.exp * 1000
          ).getTime()
          const timeRemaining = tokenExp - new Date().getTime()
          const remainingH = timeRemaining / 1000 / 60 / 60
          const remainingMin = (remainingH - Math.trunc(remainingH)) * 60
          const remainingSec = (remainingMin - Math.trunc(remainingMin)) * 60
          const remainingString = `${Math.trunc(remainingH)}h:${Math.trunc(
            remainingMin
          )}m:${Math.trunc(remainingSec)}s`

          // console.log('timeRemaining s', remainingString)

          token.accessTokenExp = tokenExp
        }

        token.accessToken = fastAPIAccessToken
        token.full_name =
          'full_name' in user && typeof user.full_name === 'string'
            ? user.full_name
            : ''

        // console.group('jwt callback')
        // console.log('account', account)
        // console.log('user', user)
        // console.log('token', token)
        // console.groupEnd()
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
      if (token !== undefined) {
        session.accessToken = token.accessToken
        session.full_name = token.full_name
        session.accessTokenExp = token.accessTokenExp

        // console.group('session callback')
        // console.log('session', session)
        // console.log('token', token)
        // console.groupEnd()
      }

      return session
    }
  }
}

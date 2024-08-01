'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { signOutAction } from '@/app/lib/actions/auth'

export default function TokenMonitor () {
  const { data: session, status } = useSession()

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (status === 'authenticated') {
        const currentTime = new Date().getTime()
        const expiryTimeNextAuth = new Date(session?.expires).getTime()
        const expiryFastAPI = session.accessTokenExp

        if (expiryFastAPI !== undefined) {
          const timeRemaining = expiryFastAPI - currentTime

          const remainingHour = timeRemaining / 1000 / 60 / 60
          const remainingMin = (remainingHour - Math.trunc(remainingHour)) * 60
          const remainingSec = (remainingMin - Math.trunc(remainingMin)) * 60

          const remainingHString =
            Math.trunc(remainingHour) < 10
              ? `0${Math.trunc(remainingHour)}`
              : `${Math.trunc(remainingHour)}`
          const remainingMinString =
            Math.trunc(remainingMin) < 10
              ? `0${Math.trunc(remainingMin)}`
              : `${Math.trunc(remainingMin)}`
          const remainingSecString =
            Math.trunc(remainingSec) < 10
              ? `0${Math.trunc(remainingSec)}`
              : `${Math.trunc(remainingSec)}`

          const remainingTimeString = `${remainingHString}h:${remainingMinString}m:${remainingSecString}s`

          console.log(
            'checkAndRefreshToken',
            'token expires in',
            remainingTimeString
          )

          if (timeRemaining <= 0) {
            const logOut = async () => {
              return signOutAction()
            }
            logOut()
            alert('Token expired, logging out')
          }
        }
      }
    }

    const interval = setInterval(checkAndRefreshToken, 60 * 1000)
    return () => clearInterval(interval)
  }, [session, status])
  return null
}

'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { signOutAction } from '../lib/actions/auth'

export default function TokenMonitor () {
  const { data: session, status } = useSession()

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      console.log('checkAndRefreshToken')
      if (status === 'authenticated') {
        const currentTime = new Date().getTime()
        const expiryTimeNextAuth = new Date(session?.expires).getTime()
        const timeRemaining = expiryTimeNextAuth - currentTime
        const timeHour = timeRemaining / 1000 / 60 / 60
        const timeMin = (timeHour - Math.trunc(timeHour)) * 60
        const timeSec = (timeMin - Math.trunc(timeMin)) * 60

        console.log(
          'timeRemaining',
          `${Math.trunc(timeHour)}h:${Math.trunc(timeMin)}m:${Math.trunc(
            timeSec
          )}s`
        )
        if (timeRemaining < 0) {
          alert('NextAuth token expired')
          await signOutAction()
        }
      }
    }

    const interval = setInterval(checkAndRefreshToken, 5 * 1000)
    return () => clearInterval(interval)
  }, [session, status])
  return null
}

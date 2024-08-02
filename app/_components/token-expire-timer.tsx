'use client'

import { useEffect, useState } from 'react'
import { Session } from 'next-auth'

export default function TokenExpireTimer ({ session }: { session: Session }) {
  const [timeRemainingString, setTimeRemainingString] = useState('')

  useEffect(() => {
    async function showExpTime () {
      if (session === null) {
        return
      }
      if (!session.accessTokenExp) {
        return
      }
      const timeRemaining = session.accessTokenExp - new Date().getTime()
      if (timeRemaining < 0) {
        return
      }
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

      const remainingString = `${remainingHString}h:${remainingMinString}m:${remainingSecString}s`
      setTimeRemainingString(remainingString)
    }
    const expTimer = setInterval(showExpTime, 1000)
    return () => {
      clearInterval(expTimer)
      setTimeRemainingString('')
    }
  }, [session])

  return <p>{timeRemainingString}</p>
}

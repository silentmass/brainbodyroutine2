'use client'
import { useEffect, useState } from 'react'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieconsent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleConsent = () => {
    localStorage.setItem('cookieconsent', 'true')
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div
      className={`w-full flex justify-center items-center gap-6 bg-accent-2 p-6 border border-dashed border-content rounded-sm shadow-xl`}
    >
      <p className=''>
        This website uses cookies to ensure you get the best experience on our
        website.
      </p>
      <button
        className={`bg-accent-3 hover:bg-accent-4 active:bg-accent-5 border p-3 rounded-3xl text-nowrap`}
        onClick={handleConsent}
      >
        I Agree
      </button>
    </div>
  )
}

export default CookieConsent

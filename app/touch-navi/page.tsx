'use client'
import { useEffect, useRef, useState } from 'react'
import { number } from 'zod'

export interface coords {
  x: number | null
  y: number | null
}

export function getRangeRelativeValue (
  value: number,
  rangeStart: number,
  rangeEnd: number
) {
  if (value <= rangeStart) {
    return rangeStart
  } else if (value >= rangeEnd) {
    return rangeEnd
  } else {
    return value
  }
}

export function getRangeRelativeIndex (value: number, spacings: number) {
  const spacingsInt = Math.round(spacings)
  return Math.round(value * (spacingsInt - 1))
}

export const TouchCarousel = ({
  carouselList,
  horizontal,
  invert
}: {
  carouselList: string[]
  horizontal: boolean
  invert: boolean
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [touchCoords, setTouchCoords] = useState<coords>({ x: null, y: null })
  const [relativeIndex, setRelativeIndex] = useState<number | null>(null)

  useEffect(() => {
    const div = divRef.current
    let divOffsetRight: null | number = null
    let divOffsetLeft: null | number = null
    let divOffsetBottom: null | number = null
    let divOffsetTop: null | number = null
    let divOffsetWidth: null | number = null
    let divOffsetHeight: null | number = null

    if (
      div?.offsetLeft &&
      div?.offsetWidth &&
      div?.offsetTop &&
      div?.offsetHeight
    ) {
      divOffsetRight = div?.offsetLeft + div?.offsetWidth
      divOffsetLeft = div?.offsetLeft
      divOffsetWidth = div?.offsetWidth
      divOffsetTop = div?.offsetTop
      divOffsetBottom = div?.offsetTop + div?.offsetHeight
      divOffsetHeight = div?.offsetHeight
    }

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      setTouchCoords({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })

      if (divOffsetLeft && divOffsetWidth && divOffsetTop && divOffsetHeight) {
        const relativeIndex = horizontal
          ? !invert
            ? (event.touches[0].clientX - divOffsetLeft) / divOffsetWidth
            : 1 - (event.touches[0].clientX - divOffsetLeft) / divOffsetWidth
          : !invert
          ? 1 - (event.touches[0].clientY - divOffsetTop) / divOffsetHeight
          : (event.touches[0].clientY - divOffsetTop) / divOffsetHeight

        setRelativeIndex(getRangeRelativeValue(relativeIndex, 0, 1))
      }
    }

    if (div) {
      div?.addEventListener('touchstart', handleTouchStart, { passive: false })
      div?.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      if (div) {
        div?.removeEventListener('touchstart', handleTouchStart)
        div?.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [])

  return (
    <div
      ref={divRef}
      className={`flex flex-col w-60 h-60 border justify-center items-center`}
    >
      {
        carouselList[
          getRangeRelativeIndex(
            relativeIndex ? relativeIndex : 0,
            carouselList.length
          )
        ]
      }
    </div>
  )
}

export default function Page () {
  return (
    <TouchCarousel
      carouselList={['Task 1', 'Task 2', 'Task 3']}
      horizontal={true}
      invert={false}
    />
  )
}

import {
  DownArrowTriangle,
  LeftArrowTriangle,
  RightArrowTriangle,
  TopArrowTriangle
} from '@/app/ui/form-components/icons'

export const LeftArrowTriangleButton = ({
  className
}: {
  className: string
}) => {
  return (
    <button type='submit' value={-1}>
      <LeftArrowTriangle className={`${className}`} />
    </button>
  )
}
export const RightArrowTriangleButton = ({
  className
}: {
  className: string
}) => {
  return (
    <button type='submit' value={1}>
      <RightArrowTriangle className={`${className}`} />
    </button>
  )
}

export const TopArrowTriangleButton = ({
  className
}: {
  className: string
}) => {
  return (
    <button type='submit'>
      <TopArrowTriangle className={`${className}`} />
    </button>
  )
}

export const DownArrowTriangleButton = ({
  className
}: {
  className: string
}) => {
  return (
    <button type='submit'>
      <DownArrowTriangle className={`${className}`} />
    </button>
  )
}

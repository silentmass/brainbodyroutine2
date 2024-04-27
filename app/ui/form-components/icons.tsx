export const RightArrowTriangle = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 8 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={'currentcolor'}
      strokeWidth='1'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7 11C7 8.11923 5.61686 4.77741 4.17875 2.08135C3.27416 0.3855 1 1.07798 1 3L0.999999 19C0.999999 20.922 3.27416 21.6145 4.17874 19.9187C5.61686 17.2226 7 13.8808 7 11Z'
      />
    </svg>
  )
}

export const LeftArrowTriangle = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 8 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={'currentcolor'}
      strokeWidth='1'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M1 11C1 8.11923 2.38314 4.77741 3.82125 2.08135C4.72584 0.3855 7 1.07798 7 3L7 19C7 20.922 4.72584 21.6145 3.82126 19.9187C2.38314 17.2226 1 13.8808 1 11Z'
      />
    </svg>
  )
}
export const TopArrowTriangle = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 22 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={'currentcolor'}
      strokeWidth='1'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11 0.999999C13.8808 0.999999 17.2226 2.38314 19.9187 3.82125C21.6145 4.72584 20.922 7 19 7L3 7C1.07798 7 0.3855 4.72584 2.08135 3.82125C4.7774 2.38314 8.11923 0.999999 11 0.999999Z'
      />
    </svg>
  )
}
export const DownArrowTriangle = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 22 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={'currentcolor'}
      strokeWidth='1'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11 7C13.8808 7 17.2226 5.61686 19.9187 4.17875C21.6145 3.27416 20.922 1 19 1L3 1C1.07798 1 0.3855 3.27416 2.08135 4.17875C4.7774 5.61686 8.11923 7 11 7Z'
      />
    </svg>
  )
}

export const RightArrow = ({ className }: { className: string }) => {
  const padding = 2.5
  const viewBoxHeight = 60
  const viewBoxWidth = 14
  const scaleFactor = 1
  const width = viewBoxWidth - 2 * padding
  const height = viewBoxHeight - 2 * padding
  const d = `m${padding / scaleFactor} ${padding / scaleFactor} ${
    width / scaleFactor
  } ${height / 2 / scaleFactor} ${-width / scaleFactor} ${
    height / 2 / scaleFactor
  }`
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox={`0 0 ${viewBoxWidth / scaleFactor} ${
        viewBoxHeight / scaleFactor
      }`}
      strokeWidth='1.5'
      stroke={'currentcolor'}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={d} />
    </svg>
  )
}
export const LeftArrow = ({ className }: { className: string }) => {
  const padding = 2.5
  const viewBoxHeight = 60
  const viewBoxWidth = 14
  const width = viewBoxWidth - 2 * padding
  const height = viewBoxHeight - 2 * padding
  const scaleFactor = 1

  const d = `m${(padding + width) / scaleFactor} ${padding / scaleFactor} ${
    -width / scaleFactor
  } ${height / 2 / scaleFactor} ${width / scaleFactor} ${
    height / 2 / scaleFactor
  }`
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox={`0 0 ${viewBoxWidth / scaleFactor} ${
        viewBoxHeight / scaleFactor
      }`}
      strokeWidth='1.5'
      stroke={'currentcolor'}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={d} />
    </svg>
  )
}
export const TopArrow = ({ className }: { className: string }) => {
  const padding = 2.5

  const viewBoxHeight = 14
  const viewBoxWidth = 60
  const width = viewBoxWidth - 2 * padding
  const height = viewBoxHeight - 2 * padding
  const scaleFactor = 1
  const d = `m${padding / scaleFactor} ${(padding + height) / scaleFactor} ${
    width / 2 / scaleFactor
  } ${-height / scaleFactor} ${width / 2 / scaleFactor} ${height / scaleFactor}`
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox={`0 0 ${viewBoxWidth / scaleFactor} ${
        viewBoxHeight / scaleFactor
      }`}
      strokeWidth='1.5'
      stroke={'currentcolor'}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={d} />
    </svg>
  )
}
export const DownArrow = ({ className }: { className: string }) => {
  const padding = 2.5

  const viewBoxHeight = 14
  const viewBoxWidth = 60
  const width = viewBoxWidth - 2 * padding
  const height = viewBoxHeight - 2 * padding
  const scaleFactor = 1
  const d = `m${padding / scaleFactor} ${padding / scaleFactor} ${
    width / 2 / scaleFactor
  } ${height / scaleFactor} ${width / 2 / scaleFactor} ${-height / scaleFactor}`
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox={`0 0 ${viewBoxWidth / scaleFactor} ${
        viewBoxHeight / scaleFactor
      }`}
      strokeWidth='1.5'
      stroke={'currentcolor'}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={d} />
    </svg>
  )
}

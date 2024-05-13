export async function animateListMovement (
  startPosition: number,
  endPosition: number,
  setPositionStateFun: (position: number) => void
) {
  return new Promise(resolve => {
    const dt = 1 / 120
    const velocityPxPerSec = 1300
    const distance = endPosition - startPosition
    const duration = Math.abs(distance) / velocityPxPerSec
    const step = dt * (distance / duration)
    let timer: NodeJS.Timeout
    let position = startPosition
    let startTime = performance.now() / 1000
    let currentTime = 0
    let relativePosition = 0
    let dampeningFactor = 1

    timer = setInterval(() => {
      currentTime = performance.now() / 1000
      const totalTime = currentTime - startTime
      const inside = relativePosition >= 0 && relativePosition <= 1
      if (inside) {
        // Include sigmoid factor here

        relativePosition = (position + step - startPosition) / distance
        dampeningFactor = (1 - relativePosition ** 4) ** 2
        position = position + step + dampeningFactor
        setPositionStateFun(position)
      } else {
        position = endPosition
        setPositionStateFun(position)
        clearInterval(timer)
        resolve(true)
      }
    }, Math.round(1000 * dt))
  })
}

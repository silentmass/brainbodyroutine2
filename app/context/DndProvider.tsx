'use client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import isMobile from '../utils/isMobile'

export function getDropTargetElementsAtPoint (
  x: number,
  y: number,
  dropTargets: Element[]
) {
  return dropTargets.filter(t => {
    const rect = t.getBoundingClientRect()
    return (
      x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
    )
  })
}

const DndContextProvider = ({ children }: { children: React.ReactNode }) => {
  const backend = isMobile() ? TouchBackend : HTML5Backend

  const hasNative =
    typeof document !== 'undefined' && document && document.elementsFromPoint

  // use custom function only if elementsFromPoint is not supported
  const backendOptions = {
    getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
    delay: isMobile() ? 200 : 0
  }

  return (
    <DndProvider backend={backend} options={backendOptions}>
      {children}
    </DndProvider>
  )
}

export default DndContextProvider

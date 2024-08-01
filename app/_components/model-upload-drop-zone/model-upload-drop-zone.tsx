'use client'

import { BackspaceIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { DragEvent, useRef, useState } from 'react'
import React from 'react'
import { number } from 'zod'

export interface DropFile {
  name: string
  url: string
  type: string
  size: number
}

const getDataTransferItemFileUrl = (item: DataTransferItem) => {
  const file = item.getAsFile()

  if (file === null) return null

  return {
    name: file.name,
    url: URL.createObjectURL(file),
    type: file.type,
    size: file.size
  }
}

const getDataTransferListItemFileUrls = (list: DataTransferItemList) => {
  let newList = new Array<DropFile>(DataTransferItemList.length)

  for (var i = 0; i < list.length; i++) {
    if (list[i].kind !== 'file') return null

    const newUrl = getDataTransferItemFileUrl(list[i])

    if (newUrl) {
      newList[i] = newUrl
    }
  }

  return newList
}

const PointerStats = ({
  draggedObject,
  pointerContainerAttributes
}: {
  draggedObject: any
  pointerContainerAttributes: {
    x: number | null
    y: number | null
    visible: boolean
  }
}) => {
  return (
    <ul
      id='stats'
      className='absolute flex flex-col top-0 left-0 text-xs p-6'
      style={{
        visibility: pointerContainerAttributes.visible ? 'visible' : 'hidden'
      }}
    >
      <li>
        Dragged:{' '}
        {draggedObject !== null && typeof draggedObject === 'object'
          ? draggedObject.length
          : 'null'}
      </li>
      <li>
        {`pointer: x: ${pointerContainerAttributes.x}, y: ${pointerContainerAttributes.y}`}
      </li>
    </ul>
  )
}

export const ListDroppedFilesImages = ({
  files
}: {
  files:
    | {
        name: string
        url: string
        type: string
        size: number
      }[]
    | DropFile[]
    | null
}) => {
  return (
    files &&
    files.map(entry => {
      return (
        <li key={`${entry.name}`} className='flex bg-accent-3'>
          <Image
            src={entry.url}
            width={30}
            height={30}
            alt={`${entry.name}`}
            // onLoad={() => URL.revokeObjectURL(entry.url)}
          />
          <p className='flex text-xs items-center'>{entry.name}</p>
        </li>
      )
    })
  )
}

export default function ModelUploadDropZone ({
  onFileChange = null
}: {
  onFileChange: null | ((newFile: any) => void)
}) {
  const [pointerContainerAttributes, setPointerContainerAttributes] = useState<{
    x: null | number
    y: null | number
    visible: boolean
  }>({
    x: null,
    y: null,
    visible: false // show stats
  })
  const [draggedObject, setDraggedObject] = useState<null | number | any[]>(
    null
  )
  const [isDragOver, setIsDragOver] = useState(false)

  function setPointerContainerPosition (e: React.MouseEvent) {
    const newPosition = {
      x: e.clientX,
      y: e.clientY
    }
    setPointerContainerAttributes(previousState =>
      previousState !== null
        ? { ...previousState, ...newPosition }
        : previousState
    )
  }

  function dragEndHandler (ev: React.DragEvent) {
    ev.preventDefault()
    console.log('dragEnd')
    var dt = ev.dataTransfer
    if (dt.items) {
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i)
      }
    } else {
      ev.dataTransfer.clearData()
    }
  }

  function dragOverHandler (ev: React.DragEvent) {
    ev.preventDefault()
    let childElements: any[] = []
    if (ev.currentTarget && ev.currentTarget.hasChildNodes()) {
      childElements = [...ev.currentTarget.children].filter(
        element => !/dropZone|stats|redBox|deleteObject/.exec(element.id)
      )
    }
    if (childElements.length) {
      return console.log(childElements)
    }
    setPointerContainerPosition(ev)
  }

  const dropZoneDragOverHandler = (ev: React.DragEvent) => {
    console.log('dropZoneDragOverHandler')
    ev.preventDefault()
    return setIsDragOver(true)
  }

  const dropZoneDragLeave = (ev: React.DragEvent) => {
    console.log('dropZoneDragLeaveHandler')
    ev.preventDefault()
    return setIsDragOver(false)
  }

  const dropZoneDropHandler = (ev: React.DragEvent) => {
    console.log('dropZoneDropHandler')
    ev.preventDefault()
    const dt = ev.dataTransfer
    console.log(dt.items)
    if (dt.items) {
      const urls = getDataTransferListItemFileUrls(dt.items)
      setDraggedObject(urls ? [...urls] : null)

      onFileChange && onFileChange(urls)
    } else {
      const files = [...dt.files].map(entry => ({
        name: entry.name,
        url: URL.createObjectURL(entry),
        type: entry.type,
        size: entry.size
      }))
      setDraggedObject(files)
      onFileChange && onFileChange(files)
    }
    setPointerContainerAttributes(previousState =>
      previousState ? { ...previousState, visible: false } : previousState
    )
    setIsDragOver(false)
  }

  return (
    <div
      className='relative flex h-full w-full justify-center items-center'
      onDragOver={dragOverHandler}
    >
      {/* Drop zone */}
      <div
        id='dropZone'
        className={`flex relative w-full h-full items-center justify-center bg-accent-1 rounded-md outline-dashed outline-accent-3 p-2 ${clsx(
          {
            'outline outline-offset-2 outline-accent-8 bg-accent-3 border-0':
              isDragOver,
            '': !isDragOver
          }
        )}`}
        onDragOver={dropZoneDragOverHandler}
        onDragLeave={dropZoneDragLeave}
        onDrop={dropZoneDropHandler}
        onDragEnd={dragEndHandler}
      >
        <ul className='flex flex-col w-full h-full items-center justify-center gap-1'>
          {draggedObject && typeof draggedObject !== 'number' ? (
            <ListDroppedFilesImages files={draggedObject} />
          ) : (
            <li>
              <label>Drop zone</label>
            </li>
          )}
        </ul>
        <button
          id='deleteObject'
          className={`flex absolute top-0 right-0 p-1`}
          style={{ visibility: draggedObject ? 'visible' : 'hidden' }}
          onClick={e => {
            e.preventDefault()
            setDraggedObject(null)
            setIsDragOver(false)
          }}
        >
          <BackspaceIcon className='icon flex w-5 h-5' />
        </button>
      </div>
      <PointerStats
        draggedObject={draggedObject}
        pointerContainerAttributes={pointerContainerAttributes}
      />
    </div>
  )
}

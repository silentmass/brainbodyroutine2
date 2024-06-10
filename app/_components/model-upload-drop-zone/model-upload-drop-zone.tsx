'use client'

import { BackspaceIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { DragEvent, useRef, useState } from 'react'
import React from 'react'
import { number } from 'zod'

interface DropFile {
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

export default function ModelUploadDropZone () {
  const divRef = useRef<null | HTMLDivElement>(null)
  const pointerContainer = useRef<null | HTMLDivElement>(null)
  const [pointerContainerAttributes, setPointerContainerAttributes] = useState<{
    x: null | number
    y: null | number
    visible: boolean
  }>({
    x: null,
    y: null,
    visible: false
  })
  const [draggedObject, setDraggedObject] = useState<null | number | any[]>(
    null
  )
  const [isDragOver, setIsDragOver] = useState(false)

  function setPointerContainerPosition (e: React.MouseEvent) {
    if (divRef.current && pointerContainer.current) {
      const newPosition = {
        x:
          e.clientX -
          divRef.current.offsetLeft -
          pointerContainer.current.offsetWidth,
        y:
          e.clientY -
          divRef.current.offsetTop -
          pointerContainer.current.offsetHeight
      }
      setPointerContainerAttributes(previousState =>
        previousState !== null
          ? { ...previousState, ...newPosition }
          : previousState
      )
    }
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

  function mouseMoveHandler (ev: React.MouseEvent) {
    ev.preventDefault()
    console.log('mouseMove')
    let childElements: any[] = []
    if (ev.currentTarget && ev.currentTarget.hasChildNodes()) {
      childElements = [...ev.currentTarget.children].filter(
        element => !/dropZone|stats|redBox/.exec(element.id)
      )
    }
    if (childElements.length) {
      return console.log(childElements)
    }
    setPointerContainerPosition(ev)
  }

  function dragEnterHandler (ev: React.DragEvent) {
    ev.preventDefault()
    console.log('dragEnter')
    setPointerContainerAttributes(previousState =>
      previousState ? { ...previousState, visible: true } : previousState
    )
  }

  function dragLeaveHandler (ev: React.DragEvent) {
    ev.preventDefault()
    console.log('dragLeave')
    if (
      divRef.current &&
      (ev.clientX < divRef.current?.offsetLeft ||
        ev.clientX > divRef.current.offsetLeft + divRef.current.offsetWidth)
    ) {
      setPointerContainerAttributes(previousState =>
        previousState ? { ...previousState, visible: false } : previousState
      )
    }
  }

  function dragOverHandler (ev: React.DragEvent) {
    ev.preventDefault()
    let childElements: any[] = []
    if (ev.currentTarget && ev.currentTarget.hasChildNodes()) {
      childElements = [...ev.currentTarget.children].filter(
        element => !/dropZone|stats|redBox/.exec(element.id)
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
    } else {
      setDraggedObject(
        [...dt.files].map(entry => ({
          name: entry.name,
          url: URL.createObjectURL(entry),
          type: entry.type,
          size: entry.size
        }))
      )
    }
    setPointerContainerAttributes(previousState =>
      previousState ? { ...previousState, visible: false } : previousState
    )
    setIsDragOver(false)
  }

  return (
    <div
      ref={divRef}
      className='relative flex w-full h-full bg-gray-800 justify-center items-center'
      onMouseMove={mouseMoveHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      <div id='dropZoneRelativeParent' className='flex flex-col relative'>
        {/* Drop zone */}
        <div
          id='dropZone'
          className={`flex border border-dashed w-[200px] h-[200px] items-center justify-center ${clsx(
            {
              'outline outline-offset-2 outline-rose-400 border-0 bg-gray-700':
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
              draggedObject.map(entry => {
                return (
                  <li key={`${entry.name}`} className='flex bg-content/10'>
                    <Image
                      src={entry.url}
                      width={30}
                      height={30}
                      alt={`${entry.name}`}
                      onLoad={() => URL.revokeObjectURL(entry.url)}
                    />
                    {entry.name}
                  </li>
                )
              })
            ) : (
              <li>Drop zone</li>
            )}
          </ul>
        </div>
        <button
          className={`absolute top-0 right-0 flex p-6 ${clsx({
            '': draggedObject,
            hidden: !draggedObject
          })}`}
          onClick={e => {
            e.preventDefault()
            setDraggedObject(null)
            setIsDragOver(false)
          }}
        >
          <BackspaceIcon className='icon flex w-5 h-5' />
        </button>
      </div>
      {/* Stats */}
      <ul
        id='stats'
        className='absolute flex flex-col top-0 w-full text-xs p-6'
      >
        <li>
          Dragged:{' '}
          {draggedObject !== null && typeof draggedObject === 'object'
            ? draggedObject.length
            : 'null'}
        </li>
        <li>
          redBox visible:{' '}
          {pointerContainerAttributes
            ? `${pointerContainerAttributes.visible}`
            : null}
        </li>
      </ul>
      {/* Red pointer box container */}
      <div
        ref={pointerContainer}
        id='redBox'
        className={`absolute flex min-w-[30px] min-h-[30px] bg-red-400 top-20 left-0 p-6 ${clsx(
          {
            '': pointerContainerAttributes.visible,
            hidden: !pointerContainerAttributes.visible
          }
        )}`}
        style={{
          left:
            pointerContainerAttributes.x !== null
              ? pointerContainerAttributes.x
              : 0,
          top:
            pointerContainerAttributes.y !== null
              ? pointerContainerAttributes.y
              : 0
        }}
        draggable
      >
        <ul className='flex flex-col w-full h-full items-center justify-center'>
          {draggedObject && typeof draggedObject !== 'number' ? (
            draggedObject.map(entry => (
              <li key={`${entry.name}`}>{entry.name}</li>
            ))
          ) : (
            <li className='flex w-full h-full'>Drop zone</li>
          )}
        </ul>
      </div>
    </div>
  )
}

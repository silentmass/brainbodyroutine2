'use client'
import ModelUploadDropZone, {
  DropFile,
  ListDroppedFilesImages
} from '@/app/_components/model-upload-drop-zone/model-upload-drop-zone'
import { useState } from 'react'

export default function Page () {
  const [imageFile, setImageFile] = useState<DropFile[] | null>(null)

  const handleFileChange = (newFile: any) => {
    setImageFile(newFile)
  }
  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
      <ModelUploadDropZone onFileChange={handleFileChange} />
      <ListDroppedFilesImages files={imageFile} />
      {imageFile && imageFile.map(({ url }, idx) => <p key={idx}>{url}</p>)}
    </div>
  )
}

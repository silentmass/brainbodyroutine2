import ColorPickerButton from '@/app/task-editor/_components/ColorPickerButton'

export default function Page () {
  return (
    <div className='page h-full items-center'>
      <ColorPickerButton currentHex='#000000' />
    </div>
  )
}

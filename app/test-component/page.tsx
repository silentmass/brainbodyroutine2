'use client'
import { ListBulletIcon, PencilIcon } from '@heroicons/react/24/outline'
import ColorPicker, {
  getHslHex,
  getPrimaryHsl,
  hslToHex
} from '../task-editor/_components/ColorPicker'
import { useEffect, useState } from 'react'
import ModelUploadDropZone from '../_components/model-upload-drop-zone/model-upload-drop-zone'
import Link from 'next/link'
import BasicButton from '../_components/circle-vibes/BasicButton'

const repeatString = (text: string) => {
  return new Array(20).fill(text).join(', ')
}

export default function Page () {
  const [hslHex, setHslHex] = useState<null | string>(null)
  useEffect(() => {
    setHslHex(getHslHex())
    console.log(hslHex, getHslHex())
  }, [])
  return (
    <div className='relative page flex-col gap-2'>
      <div className='flex gap-5'>
        <label>Pages</label>
        <Link className='link' href={'/test-component/button'}>
          Button
        </Link>
        <Link className='link' href={'/test-component/search-amazon'}>
          Search Amazon
        </Link>
        <Link className='link' href={'/test-component/search-croq'}>
          Search CROQ
        </Link>
      </div>
      <div className='flex w-full'>
        <ModelUploadDropZone onFileChange={null} />
      </div>
      {hslHex !== null && hslHex !== undefined && (
        <div className='fixed top-[55px] right-0 z-20'>
          <ColorPicker defaultHexColor={hslHex} />
        </div>
      )}
      <div className='flex'>
        <div className='min-w-10 min-h-10 bg-accent-bkg flex justify-center items-center'>
          bkg
        </div>
        <div className='min-w-10 min-h-10 bg-accent-1 flex justify-center items-center'>
          1
        </div>
        <div className='min-w-10 min-h-10 bg-accent-2 flex justify-center items-center'>
          2
        </div>
        <div className='min-w-10 min-h-10 bg-accent-3 flex justify-center items-center'>
          3
        </div>
        <div className='min-w-10 min-h-10 bg-accent-4 flex justify-center items-center'>
          4
        </div>
        <div className='min-w-10 min-h-10 bg-accent-5 flex justify-center items-center'>
          5
        </div>
        <div className='min-w-10 min-h-10 bg-accent-6 flex justify-center items-center'>
          6
        </div>
        <div className='min-w-10 min-h-10 bg-accent-7 flex justify-center items-center'>
          7
        </div>
        <div className='min-w-10 min-h-10 bg-accent-8 flex justify-center items-center'>
          8
        </div>
        <div className='min-w-10 min-h-10 bg-accent-content flex justify-center items-center'>
          Content
        </div>
      </div>
      <h1>H1 Test Component</h1>
      <h2>H2 Test Component</h2>
      <h3>H3 Test Component</h3>
      <p>P Component</p>
      Normal text
      <div className='flex gap-5'>
        <span className='link'>Link</span>
        <span className='link-hovered'>Link hovered</span>
        <span className='link-activated'>Link activated</span>
        <span className='link-active'>Link active</span>
      </div>
      <label>Label Component</label>
      <h1 className='description'>
        H1 Component description
        <br />
        2nd line: H1 component description
      </h1>
      <div className='card'>Div card</div>
      <div className='card-nulluser'>
        <div>Div card-nulluser and inner div</div>
      </div>
      <textarea defaultValue={`${repeatString('textarea')}`} />
      <textarea
        defaultValue={`${repeatString('description-input')}`}
        className='description-input'
      />
      <textarea
        defaultValue={`${repeatString('description-input-create')}`}
        className='description-input-create'
      />
      <input type='text' defaultValue={'input type text'} />
      <input
        type='text'
        defaultValue={'input type text descripion'}
        className='descripion'
      />
      <input
        type='password'
        defaultValue={'input type password'}
        className=''
      />
      <div className='flex gap-5'>
        <input type='checkbox' />
        <input type='checkbox' className='hovered' />
        <input type='checkbox' className='activated' />
        <input type='checkbox' className='' defaultChecked={true} />
      </div>
      <select>
        <option label={'Option 1'} />
        <option label={'Option 2'} />
        <option label={'Option 3'} />
      </select>
      <select className='select-focused'>
        <option label={'Option 1'} />
        <option label={'Option 2'} />
        <option label={'Option 3'} />
      </select>
      <select className='material'>
        <option label={'material'} />
        <option label={'Option 2'} />
        <option label={'Option 3'} />
      </select>
      <select className='material-disabled' disabled={true}>
        <option label={'material-disabled + disabled'} />
        <option label={'Option 2'} />
        <option label={'Option 3'} />
      </select>
      <div className='flex flex-col gap-3'>
        <div>
          <PencilIcon className='w-5 h-5' />
        </div>
        <div className='flex gap-5'>
          <PencilIcon className='w-5 h-5 icon' />
          <PencilIcon className='w-5 h-5 icon-hovered' />
          <PencilIcon className='w-5 h-5 icon-activated' />
          icon
        </div>
        <div className='flex gap-5'>
          <PencilIcon className='w-5 h-5 icon-topnavi' />
          <PencilIcon className='w-5 h-5 icon-topnavi-hovered' />
          <PencilIcon className='w-5 h-5 icon-topnavi-activated' />
          icon-topnavi
        </div>
        <div className='flex gap-5'>
          <PencilIcon className='w-5 h-5 icon-bottomnavi' />
          <PencilIcon className='w-5 h-5 icon-bottomnavi-hovered' />
          <PencilIcon className='w-5 h-5 icon-bottomnavi-activated' />
          icon-bottom-navi
        </div>
        <div className='flex gap-5'>
          <PencilIcon className='w-5 h-5 pending-icon' />
          <PencilIcon className='w-5 h-5 pending-icon-hovered' />
          pending-icon
        </div>
        <div className='topnavi'>topnavi</div>
        <ul className='topnavi'>ul topnavi</ul>
        <div className='bottom-navi'>bottom-navi</div>
        <ul className='description'>ul description</ul>
        <li className='description'>li description</li>
        <div className='description-container'>description-container</div>
        <div className='flex gap-5'>
          <div className='palette'>palette</div>
          <div className='palette-hovered'>palette-hovered</div>
          <div className='palette-activated'>palette-activated</div>
          <div className='palette-selected'>palette-selected</div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex gap-5'>
            <button>Button</button>
          </div>
          <div className='flex gap-5'>
            <button className='formActionButton'>formActionButton</button>
            <button className='formActionButton-hovered'>
              formActionButton
            </button>
            <button className='formActionButton-activated'>
              formActionButton
            </button>
          </div>
          <div className='flex gap-5 bottom-navi p-5'>
            <button className='formActionButton'>formActionButton</button>
            <button className='formActionButton-hovered'>
              formActionButton
            </button>
            <button className='formActionButton-activated'>
              formActionButton
            </button>
          </div>
          <div className='flex gap-5'>
            <button className='formActionButton-active'>
              formActionButton-active
            </button>
            <button className='formActionButton-active-hovered'>
              formActionButton-active
            </button>
            <button className='formActionButton-active-activated'>
              formActionButton-active
            </button>
          </div>
          <div className='flex gap-5 bottom-navi p-5'>
            <button className='formActionButton-active'>
              formActionButton-active
            </button>
            <button className='formActionButton-active-hovered'>
              formActionButton-active
            </button>
            <button className='formActionButton-active-activated'>
              formActionButton-active
            </button>
          </div>
          <div className='flex gap-5'>
            <button className='formActionButtonCheck'>
              formActionButtonCheck
            </button>
            <button className='formActionButtonCheck-hovered'>
              formActionButtonCheck
            </button>
            <button className='formActionButtonCheck-activated'>
              formActionButtonCheck
            </button>
          </div>
          <div className='flex gap-5'>
            <button className='formActionButtonCheck-pending'>
              formActionButtonCheck-pending
            </button>
          </div>
          <div className='flex gap-5'>
            <button className='pending'>pending</button>
            <button className='pending-delete'>pending.delete</button>
          </div>
          <div className='flex gap-5'>
            <button className='delete'>delete</button>
            <button className='delete-hovered'>delete</button>
            <button className='delete-activated'>delete</button>
          </div>
          <div className='flex gap-5'>
            <button className='formActionButton'>Normal</button>
            <button className='disable-button'>Disabled</button>
            <button className='disable-button disable-button-hovered'>
              Disabled
            </button>
            <button className='disable-button disable-button-activated'>
              Disabled
            </button>
          </div>
          <div className='flex gap-5 items-center'>
            <div>
              <BasicButton>
                <div className='flex rounded-cool group-hover:bg-accent-5 group-active:bg-accent-6'>
                  <ListBulletIcon className='icon w-6 h-6' />
                </div>
              </BasicButton>
            </div>
            <div>
              <BasicButton>
                <div className='flex rounded-cool bg-accent-5 group-hover:bg-accent-5 group-active:bg-accent-5'>
                  <ListBulletIcon className='icon w-8 h-8' />
                </div>
              </BasicButton>
            </div>
            <div>
              <BasicButton>
                <div className='flex rounded-cool bg-accent-5 group-hover:bg-accent-5 group-active:bg-accent-5'>
                  <ListBulletIcon className='icon w-8 h-8' />
                </div>
              </BasicButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

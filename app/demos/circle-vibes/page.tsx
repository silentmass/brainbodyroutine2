import BasicButton from '@/app/_components/demos/circle-vibes/BasicButton'
import BasicTextButton from '@/app/_components/demos/circle-vibes/BasicTextButton'
import ButtonContainer from '@/app/_components/demos/circle-vibes/ButtonContainer'
import Card from '@/app/_components/demos/circle-vibes/CircleVibesCard'
import CardBottomRow from '@/app/_components/demos/circle-vibes/CardBottomRow'
import CardTopRow from '@/app/_components/demos/circle-vibes/CardTopRow'
import CardTopRowCheckButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowCheckButtonContainer'
import CardTopRowEditButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowEditButtonContainer'
import CardTopRowOpenButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowOpenButtonContainer'
import UpdateTaskCard from '@/app/_components/demos/circle-vibes/UpdateTaskCard'
import EditButtonsContainer from '@/app/_components/demos/circle-vibes/EditButtonsContainer'
import LargeCheckButton from '@/app/_components/demos/circle-vibes/LargeCheckButton'
import LargeOpenButton from '@/app/_components/demos/circle-vibes/LargeOpenButton'
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function Page () {
  return (
    <div className='page flex-col items-center gap-6'>
      <UpdateTaskCard />
      {/* 
      Button examples 
      */}
      <ButtonContainer>
        <BasicButton>
          <TrashIcon className='icon w-5 h-5' />
        </BasicButton>
      </ButtonContainer>
      <ButtonContainer>
        <BasicButton>
          <ChevronDownIcon className='icon w-5 h-5' />
        </BasicButton>
        <BasicButton>
          <TrashIcon className='icon w-5 h-5' />
        </BasicButton>
        <BasicButton>
          <PencilIcon className='icon w-5 h-5' />
        </BasicButton>
      </ButtonContainer>
      <BasicTextButton>Update</BasicTextButton>
      <BasicTextButton isDisabled={true}>Update</BasicTextButton>
      <BasicTextButton isDisabled={true}>Update</BasicTextButton>
      <BasicTextButton type={'delete'}>Delete</BasicTextButton>
      <BasicTextButton isDisabled={true} type={'delete'}>
        Delete
      </BasicTextButton>
      <LargeOpenButton />
      <LargeOpenButton isDisabled={true} />
      <LargeCheckButton />
      <LargeCheckButton checked={true} />
      <LargeCheckButton isDisabled={true} />
      <LargeCheckButton checked={true} isDisabled={true} />
      <Card>
        <CardTopRow>
          <CardTopRowOpenButtonContainer>
            <LargeOpenButton />
          </CardTopRowOpenButtonContainer>
          <CardTopRowCheckButtonContainer>
            <LargeCheckButton />
          </CardTopRowCheckButtonContainer>
          <CardTopRowEditButtonContainer>
            <ButtonContainer>
              <BasicButton>
                <EllipsisHorizontalIcon className='icon w-5 h-5' />
              </BasicButton>
            </ButtonContainer>
          </CardTopRowEditButtonContainer>
        </CardTopRow>
        <CardBottomRow>
          <p>
            Go running stairs all night long along along together. Go running
            stairs all night long along along together.
          </p>
        </CardBottomRow>
      </Card>
      <Card>
        <CardTopRow>
          <CardTopRowOpenButtonContainer>
            <LargeOpenButton />
          </CardTopRowOpenButtonContainer>
          <CardTopRowCheckButtonContainer>
            <LargeCheckButton />
          </CardTopRowCheckButtonContainer>
          <CardTopRowEditButtonContainer>
            <ButtonContainer>
              <BasicButton>
                <ChevronDownIcon className='icon w-5 h-5' />
              </BasicButton>
              <BasicButton>
                <TrashIcon className='icon w-5 h-5' />
              </BasicButton>
              <BasicButton>
                <PencilIcon className='icon w-5 h-5' />
              </BasicButton>
            </ButtonContainer>
          </CardTopRowEditButtonContainer>
        </CardTopRow>
        <CardBottomRow isPaddingRight={true}>
          <p>
            Go running stairs all night long along along together. Go running
            stairs all night long along along together.
          </p>
        </CardBottomRow>
      </Card>
      {/* 
      Task list table card
      */}
      <Card>
        <CardTopRow>
          <CardTopRowOpenButtonContainer>
            <LargeOpenButton />
          </CardTopRowOpenButtonContainer>
          <CardTopRowCheckButtonContainer>
            <LargeCheckButton checked={true} />
          </CardTopRowCheckButtonContainer>
          <CardTopRowEditButtonContainer>
            <EditButtonsContainer />
          </CardTopRowEditButtonContainer>
        </CardTopRow>
        <CardBottomRow isPaddingRight={true}>
          <p>
            Go running stairs all night long along along together. Go running
            stairs all night long along along together.
          </p>
        </CardBottomRow>
      </Card>
    </div>
  )
}

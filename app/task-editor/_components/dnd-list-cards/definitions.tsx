import { Dispatch, SetStateAction } from 'react'

export interface descriptionList {
  id: number
  title: string
  description: string[]
}

export interface modelContainer {
  id: number
  title: string
}

export interface ContainerCard {
  cardId: string
  body: descriptionList | modelContainer
}

export interface listContainer {
  cards: ContainerCard[]
  setCards: Dispatch<SetStateAction<ContainerCard[] | null>>
  onSelectList: (id: number) => void
  onEditModel: () => void
  isModal: boolean
  isModelEdit: boolean
  textureText: string
  showTextureText: boolean
  adUrl: string | null
}

export interface DescriptionCards {
  cardId: string
  body: {
    description: string
  }
}

export interface ListDescriptionCard {
  listId: number
  title: string
  descriptionCards: DescriptionCards[]
}

export interface DescriptionCard {
  cards: DescriptionCards[]
  setCards: (cards: DescriptionCards[] | null) => void
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onDescriptionDelete: (cardId: number) => void
}

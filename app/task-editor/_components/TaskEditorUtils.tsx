import { checkListsDiffer } from './descriptionlist-form/utils'
import {
  ContainerCard,
  descriptionList,
  ListDescriptionCard
} from './dnd-list-cards/definitions'

export function getCardLists (cards: ContainerCard[] | null) {
  if (!cards || cards.filter(({ body }) => 'description' in body).length === 0)
    return null
  return cards
    .filter(({ body }) => 'description' in body)
    .map(({ body }) => body as descriptionList)
}

export const getInitialBodies = (
  lists: descriptionList[],
  initialModelBody: { id: number; title: string }
) => {
  return lists
    ? [lists[0], initialModelBody, ...lists.slice(1)]
    : [initialModelBody]
}

export const getInitialCards = (
  lists: descriptionList[],
  initialModelBody: { id: number; title: string }
) => {
  return getInitialBodies(lists, initialModelBody).map((body, idx) => ({
    cardId: `${idx}`,
    body: body
  }))
}

export function checkIsModal (
  selectedList: ListDescriptionCard | null,
  isModelEdit: boolean
) {
  return selectedList !== null || isModelEdit
}

export function listIdExists (
  selectedList: ListDescriptionCard | null,
  containerCards: null | ContainerCard[]
) {
  return (
    selectedList !== null &&
    selectedList.listId &&
    containerCards &&
    containerCards.find(({ body }) => body.id === selectedList.listId) !==
      undefined
  )
}

export const getOriginalList = (
  selectedList: ListDescriptionCard | null,
  containerCards: null | ContainerCard[]
) => {
  return selectedList !== null && selectedList.listId && containerCards
    ? (containerCards.find(card => {
        return (
          'description' in card.body && card.body.id === selectedList.listId
        )
      })?.body as descriptionList)
    : null
}

export function checkIsFormDirty (
  selectedList: ListDescriptionCard | null,
  containerCards: null | ContainerCard[],
  isModelEdit: boolean,
  isConfirmed: ConfirmationType,
  isLogging = false
) {
  const originalList = getOriginalList(selectedList, containerCards)

  const descriptionsChanged = (isLogging = false) => {
    if (originalList === undefined) {
      isLogging && console.log('originalList === undefined')
      return false
    }
    if (originalList === null) {
      isLogging && console.log('originalList === null')
      return false
    }
    if (!originalList) {
      isLogging && console.log('originalList not exists')
      return false
    }
    if (!selectedList) {
      isLogging && console.log('selectedList not exists')
      return false
    }
    if (selectedList.descriptionCards === undefined) {
      isLogging && console.log('selectedList.descriptionCards === undefined')
      return false
    }
    if (selectedList.descriptionCards === null) {
      isLogging && console.log('selectedList.descriptionCards === null')
      return false
    }

    const listsDiffer = checkListsDiffer(
      selectedList.descriptionCards.map(
        ({ body: { description } }) => description
      ),
      originalList.description
    )

    if (listsDiffer) {
      isLogging && console.log('listsDiffer')
      return false
    }

    const titleDiffer = selectedList.title !== originalList.title

    if (titleDiffer) {
      isLogging && console.log('titleDiffer')
      return false
    }

    return true
  }

  const descriptionsHaveChanged = descriptionsChanged()

  const isFormDirty =
    (!listIdExists(selectedList, containerCards) &&
      isConfirmed &&
      checkIsModal(selectedList, isModelEdit)) ||
    (!descriptionsHaveChanged && checkIsModal(selectedList, isModelEdit))

  return isFormDirty
}

export const sendUpdateWithId = (
  selectedList: ListDescriptionCard,
  fun: (listId: string, formData: FormData) => void
) => {
  return fun.bind(null, `${selectedList.listId}`)
}

export type ConfirmationType =
  // Confirm delete
  | 'delete'
  // Confirm modal close
  | 'close'
  // Do not confirm
  | null

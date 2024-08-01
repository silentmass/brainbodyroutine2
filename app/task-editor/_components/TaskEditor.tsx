'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import DescriptionListForm from './descriptionlist-form/DescriptionListForm'
import descriptionsPlaceholderData from '../_assets/descriptions.json'
import { FormContext } from './Contexts'
import { ListContainer } from './dnd-list-cards/ListDndCards'
import {
  ContainerCard,
  DescriptionCards,
  descriptionList,
  ListDescriptionCard
} from './dnd-list-cards/definitions'
import { ModalBody, ModalTitle, StateModal } from './modal'
import { TextureType } from '@/app/_components/model-palette/definitions'
import {
  TextureContext,
  textureContextType,
  TexturesContext
} from '@/app/_components/model-palette/TextureContext'
import { TextureUvContext } from '@/app/_components/model-palette/TextureUvContext'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'
import { MaterialContext } from '@/app/_components/model-palette/MaterialContext'
import { FormButtonView } from '@/app/ui/form-components/buttons'
import { checkListsDiffer, isStringEmpty } from './descriptionlist-form/utils'
import ColorPicker, { getHslHex } from './ColorPicker'
import { DropFile } from '@/app/_components/model-upload-drop-zone/model-upload-drop-zone'
import EditModel from './ModelEditor'
import ConfirmationDialog from './ConfirmationDialog'
import {
  getInitialCards,
  ConfirmationType,
  checkIsFormDirty,
  getOriginalList,
  getCardLists,
  checkIsModal,
  listIdExists,
  sendUpdateWithId
} from './TaskEditorUtils'
import { R3FTest } from '@/app/r3f-example/page'
import ModelViewPreview from '@/app/_components/model-palette/model-preview'
import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'

export default function TaskEditor ({
  lists,
  textures
}: {
  lists: descriptionList[]
  textures: TextureType[]
}) {
  const initialCards = useMemo(
    () =>
      getInitialCards(lists, {
        id: 1,
        title: '3D-Model'
      }),
    [lists]
  )

  const { descriptions: placeholderDescriptions } = useMemo(
    () => descriptionsPlaceholderData,
    [descriptionsPlaceholderData]
  )

  const [containerCards, setContainerCards] = useState<null | ContainerCard[]>(
    initialCards
  )
  const [selectedList, setSelectedList] = useState<ListDescriptionCard | null>(
    null
  )

  const ref = useRef<null | HTMLFormElement>(null)

  const [isModelEdit, setIsModelEdit] = useState(false)
  const [isConfirmationDialog, setIsConfirmationDialog] = useState(false)

  const [isConfirmed, setIsConfirmed] = useState<ConfirmationType>(null)

  const memoizedTextures: TextureType[] = useMemo(() => textures, [textures])
  const [selectedTextures, setSelectedTextures] =
    useState<TextureType[]>(memoizedTextures)
  const [selectedTextureName, setSelectedTextureName] =
    useState<textureContextType>('custom')
  const [selectedMaterialName, setSelectedMaterialName] = useState<
    string | null
  >('wave')
  const [isCubeUvSingleTexture, setIsCubeUvSingleTexture] = useState(false)
  const [textureText, setTextureText] = useState('Hello')
  const [showTextureText, setShowTextureText] = useState(true)
  const [adUrl, setAdUrl] = useState<string | null>(null)

  const [showColorPicker, setShowcolorPicker] = useState(false)
  const [hslHex, setHslHex] = useState<null | string>(null)

  useEffect(() => {
    setHslHex(getHslHex())
  }, [])

  const handleModalClose = (isLogging = false) => {
    const formIsDirty = checkIsFormDirty(
      selectedList,
      containerCards,
      isModelEdit,
      isConfirmed
    )

    isLogging && console.group('handleModalClose')
    isLogging && console.log('isModelEdit', isModelEdit)
    isLogging && console.log('isConfirmationDialog', isConfirmationDialog)
    isLogging && console.log('isFormDirty', formIsDirty)
    isLogging && console.log('selectedList', selectedList)

    if (isModelEdit && selectedList === null) {
      // Model
      isLogging && console.log('Edit model and no list')
      isLogging && console.groupEnd()
      setIsModelEdit(false)
      setIsConfirmed('close')
      return
    }

    // No model

    if (selectedList === null) return

    if (formIsDirty) {
      isLogging && console.log('Form is dirty')

      if (isConfirmed === null) {
        isLogging && console.log('Not Confirmed')
        isLogging && console.groupEnd()
        setIsConfirmationDialog(true)
        return
      }

      isLogging && console.log('Confirmed')
      isLogging && console.groupEnd()
      setIsConfirmationDialog(false)

      isLogging && console.log('Setting list to null')
      setSelectedList(null)
      setIsConfirmed(null)
      return
    }

    // No model
    // Form is clean
    isLogging && console.log('Form is clean')
    setIsConfirmationDialog(false)

    if (isConfirmed === 'delete') {
      isLogging && console.log('Delete list')
      handleListDelete(selectedList.listId)
    }

    isLogging && console.log('Setting list to null')
    setSelectedList(null)
    setIsConfirmed('close')
    isLogging && console.groupEnd()
    return
  }

  const handleSelectList = (listId: number) => {
    const originalList = getOriginalList(selectedList, containerCards)
    console.group('handleSelectList')
    console.log(
      'checkIsFormDirty',
      checkIsFormDirty(selectedList, containerCards, isModelEdit, isConfirmed),
      'isModelEdit',
      isModelEdit,
      'checkListsDiffer',
      selectedList && containerCards && originalList
        ? checkListsDiffer(
            selectedList.descriptionCards.map(
              ({ body: { description } }) => description
            ),
            originalList.description
          )
        : null
    )
    console.groupEnd()

    if (!containerCards) return

    const updatedListCard = containerCards.find(
      card => 'description' in card.body && card.body.id === listId
    )

    if (updatedListCard === undefined) return

    const updatedList = updatedListCard.body as descriptionList

    const newListCard = {
      listId: updatedList.id,
      title: updatedList.title,
      descriptionCards: updatedList.description.map((description, idx) => ({
        cardId: `${idx}`,
        body: {
          description: description
        }
      }))
    }

    setSelectedList(newListCard)
  }

  const handleSelectListClick = (id: number) => {
    handleSelectList(id)
  }

  function sendCreateList (formData: FormData) {
    const rawFormData = Object.fromEntries(formData)
    const descriptions = Object.keys(rawFormData).filter(
      entry => entry.search(/^updateDescription_/) !== -1
    )
    const header = rawFormData['listHeader']
    const lists = getCardLists(containerCards)

    const addedList = {
      id: lists ? Math.max(...lists.map(({ id }) => id)) + 1 : 1,
      title: `${header}`,
      description: [...descriptions.map(key => `${rawFormData[key]}`)]
    }

    const addedContainer = {
      cardId: containerCards
        ? `${
            Math.max(...containerCards.map(({ cardId }) => Number(cardId))) + 1
          }`
        : '1',
      body: addedList
    }

    setContainerCards(previousState =>
      previousState ? [...previousState, addedContainer] : [addedContainer]
    )
  }

  function sendUpdateList (listId: string, formData: FormData) {
    if (listId === 'null') {
      console.error('Invalid id')
      return
    }
    const rawFormData = Object.fromEntries(formData)
    const descriptions = Object.keys(rawFormData).filter(
      entry => entry.search(/^updateDescription_/) !== -1
    )
    const header = rawFormData['listHeader']
    const newList = {
      id: Number(listId),
      title: `${header}`,
      description: [...descriptions.map(key => `${rawFormData[key]}`)]
    }

    if (!containerCards || !getCardLists(containerCards)) return

    const updatedContainer = containerCards.find(
      container => container.body.id === newList.id
    )

    if (updatedContainer === undefined) return

    const addedContainer = {
      cardId: updatedContainer.cardId,
      body: newList
    }

    setContainerCards(previousState =>
      previousState
        ? previousState.map(container => {
            if (container.cardId === addedContainer.cardId) {
              return addedContainer
            }
            return container
          })
        : null
    )

    setIsConfirmed('close')
    setSelectedList(null)
  }

  const handleConfirmClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsConfirmationDialog(false)
    setIsConfirmed(null)
    setSelectedList(null)
  }

  const handleCancelClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsConfirmationDialog(false)
    setIsConfirmed(null)
  }

  const handleCreateFormClick = () => {
    const cardLists = getCardLists(containerCards)
    const newListId = cardLists
      ? Math.max(...cardLists.map(({ id }) => Number(id))) + 1
      : 1

    setIsConfirmed(null)

    setSelectedList({
      listId: newListId,
      title: 'Instructions',
      descriptionCards: placeholderDescriptions.map(({ body }, idx) => ({
        cardId: `${idx}`,
        body: { description: body }
      }))
    })
  }

  const handleEditModelClick = () => {
    setIsModelEdit(true)
  }

  const handleDropFileChange = (newFile: DropFile[]) => {
    if (!newFile || selectedTextures === undefined) return

    const newTexturetypes = newFile.map(({ url }, idx) => ({
      name: `pick_${
        selectedTextures.filter(entry => entry.name.search(/^pick/) !== -1)
          .length + 1
      }`,
      src: url
    }))
    setSelectedTextures(
      previousState => previousState && [...previousState, ...newTexturetypes]
    )
  }

  const handleTextureNameChange = (textureName: textureContextType) => {
    setSelectedTextureName(textureName)
  }

  const handleCubeUvChange = () => {
    setIsCubeUvSingleTexture(previousState => !previousState)
  }

  const handleTextChange = useDebouncedCallback((term: string) => {
    setTextureText(term)
  }, 300)

  const handleChangeShowTextureText = () => {
    setShowTextureText(previousState => !previousState)
  }

  const handleSetSelectedMaterialName = (materialName: string) => {
    setSelectedMaterialName(materialName)
  }

  const handleAdUrlChange = useDebouncedCallback((url: string) => {
    setAdUrl(url)
  }, 300)

  const handleDescriptionCreate = (desciption: string) => {
    const newDescriptionCardId =
      selectedList && selectedList.descriptionCards
        ? Math.max(
            ...selectedList.descriptionCards.map(cardEntry =>
              Number(cardEntry.cardId)
            )
          ) + 1
        : 1
    const addedDescriptionCard = {
      cardId: `${newDescriptionCardId}`,
      body: { description: desciption }
    }

    setSelectedList(previousState =>
      previousState
        ? {
            ...previousState,
            descriptionCards: [
              ...previousState.descriptionCards,
              addedDescriptionCard
            ]
          }
        : null
    )
  }

  const handleDescriptionDelete = (cardId: number) => {
    setSelectedList(previousState => {
      if (previousState) {
        return {
          ...previousState,
          descriptionCards: previousState.descriptionCards.filter(
            descriptionCard => Number(descriptionCard.cardId) !== cardId
          )
        }
      } else {
        return null
      }
    })
  }

  const handleFormInputChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (!selectedList) return

      if (e.target.id.search(/^updateDescription/) !== -1) {
        const descriptionId = Number(e.target.id.split('updateDescription_')[1])

        console.group('handleFormInputChange', descriptionId)

        if (isStringEmpty(e.target.value)) {
          console.log('string empty, do nothing')
          console.groupEnd()
          return
        }

        const newDescriptionCards = selectedList.descriptionCards
          // Update descriptions
          .map(descriptionCard => {
            if (Number(descriptionCard.cardId) === descriptionId)
              return {
                ...descriptionCard,
                body: { description: e.target.value }
              }
            return descriptionCard
          })

        const originalList = getOriginalList(selectedList, containerCards)
        const listsDiffer = originalList
          ? checkListsDiffer(
              newDescriptionCards.map(card => card.body.description),
              originalList.description.map(description => description)
            )
          : true

        console.log('listsDiffer', listsDiffer)
        if (listsDiffer) {
          setIsConfirmed(null)
          console.groupEnd()
        }

        setSelectedList(previousState =>
          previousState
            ? {
                ...previousState,
                descriptionCards: newDescriptionCards
              }
            : null
        )
      } else if (e.target.id.search(/^listHeader/) !== -1) {
        console.log('header')
        const originalList = getOriginalList(selectedList, containerCards)
        const titleDiffer = originalList
          ? originalList.title !== e.target.value
          : true

        console.log('titleDiffer', titleDiffer)
        if (titleDiffer) {
          setIsConfirmed(null)
          console.groupEnd()
        }

        setSelectedList(previousState =>
          previousState
            ? {
                ...previousState,
                title: e.target.value
              }
            : null
        )
      }
    },
    300
  )

  const handleUpdateListDescriptionCards = (
    cards: DescriptionCards[] | null
  ) => {
    setSelectedList(previousState => {
      if (previousState && cards) {
        console.log('updating', cards)

        const originalList = getOriginalList(selectedList, containerCards)
        const listsDiffer = originalList
          ? checkListsDiffer(
              cards.map(card => card.body.description),
              originalList.description.map(description => description)
            )
          : true

        console.log('listsDiffer', listsDiffer)

        if (listsDiffer) {
          setIsConfirmed(null)
        }

        return { ...previousState, descriptionCards: cards }
      } else {
        return null
      }
    })
  }

  const handleListDeleteWrapper = (event: FormEvent<HTMLButtonElement>) => {
    console.log('handleListDeleteWrapper')
    event.preventDefault()
    setIsConfirmed('delete')
    setIsConfirmationDialog(true)
    if (!selectedList) return
    handleListDelete(selectedList.listId)
  }

  const handleListDelete = (listId: number) => {
    console.log('handleListDelete', listId)

    setSelectedList(null)
    setContainerCards(previousState =>
      previousState
        ? previousState.filter(card => {
            if ('description' in card.body && card.body.id === listId) {
              return false
            }
            return true
          })
        : null
    )
  }

  const handleListReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setSelectedList(
      previousState =>
        previousState && {
          ...previousState,
          title: '',
          descriptionCards: []
        }
    )
    if (!ref || !ref.current) return
    ref.current.reset()
    setIsConfirmed('close')
  }

  return (
    <MaterialContext.Provider value={selectedMaterialName}>
      <TextureContext.Provider value={selectedTextureName}>
        <TexturesContext.Provider value={selectedTextures}>
          <TextureUvContext.Provider value={isCubeUvSingleTexture}>
            <div className='relative flex flex-col w-full h-full'>
              {/* <ModelOptimization
                textureText={textureText}
                showTextureText={true}
              /> */}
              <div className='flex flex-col w-full min-h-20 h-fit'>
                <div className='flex'>
                  <div className='flex w-1/2'>
                    <h1 className='flex text-xl'>Task Editor</h1>
                  </div>
                  <div className='flex justify-end w-1/2'>
                    {!selectedList && !isModelEdit && (
                      <BasicTextButton
                        ariaLabel='Create list'
                        onClick={handleCreateFormClick}
                        defaultValue={`${null}`}
                      >
                        Create List
                      </BasicTextButton>
                    )}
                  </div>
                </div>
              </div>
              <ListContainer
                cards={containerCards}
                setCards={setContainerCards}
                onSelectList={handleSelectListClick}
                onEditModel={handleEditModelClick}
                isModal={checkIsModal(selectedList, isModelEdit)}
                isModelEdit={isModelEdit}
                textureText={textureText}
                showTextureText={showTextureText}
                adUrl={adUrl}
              />
              {checkIsModal(selectedList, isModelEdit) && (
                <FormContext.Provider
                  value={{
                    ref: ref,
                    isDirty: checkIsFormDirty(
                      selectedList,
                      containerCards,
                      isModelEdit,
                      isConfirmed
                    )
                  }}
                >
                  <StateModal
                    onClose={handleModalClose}
                    classNames={{
                      outer: `modal-outer`,
                      inner: `modal-inner ${clsx({
                        'modal-inner-edit-model': isModelEdit,
                        'modal-inner-edit-list': !isModelEdit
                      })}`,
                      button: `${clsx({
                        'modal-button-confirmation': isConfirmationDialog,
                        '': !isConfirmationDialog
                      })}`
                    }}
                    isCloseVisible={!isConfirmationDialog}
                  >
                    <ModalTitle>Modal</ModalTitle>
                    <ModalBody>
                      <div className='relative flex flex-col w-full'>
                        {isConfirmationDialog && isConfirmed === null && (
                          <ConfirmationDialog
                            onCancelClick={handleCancelClick}
                            onConfirmClick={handleConfirmClick}
                          />
                        )}
                        {!isModelEdit && (
                          <form
                            id={'descriptionListForm'}
                            ref={ref}
                            action={
                              !listIdExists(selectedList, containerCards)
                                ? sendCreateList
                                : selectedList
                                ? sendUpdateWithId(selectedList, sendUpdateList)
                                : () => null
                            }
                          >
                            <DescriptionListForm
                              list={selectedList}
                              setCards={handleUpdateListDescriptionCards}
                              onChange={handleFormInputChange}
                              onDescriptionCreate={handleDescriptionCreate}
                              onDescriptionDelete={handleDescriptionDelete}
                              onListDelete={handleListDeleteWrapper}
                              onListReset={handleListReset}
                              isCreate={
                                !listIdExists(selectedList, containerCards)
                              }
                            />
                          </form>
                        )}
                        {isModelEdit && (
                          <EditModel
                            selectedTextures={selectedTextures}
                            handleTextureNameChange={handleTextureNameChange}
                            isCubeUvSingleTexture={isCubeUvSingleTexture}
                            handleCubeUvChange={handleCubeUvChange}
                            textureText={textureText}
                            showTextureText={showTextureText}
                            handleTextChange={handleTextChange}
                            handleChangeShowTextureText={
                              handleChangeShowTextureText
                            }
                            selectedMaterialName={`${selectedMaterialName}`}
                            onSelecteMaterialNameChange={
                              handleSetSelectedMaterialName
                            }
                            onDropFileChange={handleDropFileChange}
                            adUrl={adUrl ? adUrl : ''}
                            onAdUrlChange={handleAdUrlChange}
                          />
                        )}
                      </div>
                    </ModalBody>
                  </StateModal>
                </FormContext.Provider>
              )}
            </div>
          </TextureUvContext.Provider>
        </TexturesContext.Provider>
      </TextureContext.Provider>
    </MaterialContext.Provider>
  )
}

export const ModelOptimization = ({
  textureText,
  showTextureText
}: {
  textureText: string
  showTextureText: boolean
}) => {
  return (
    <div className='flex flex-col w-full items-center gap-10 mb-10'>
      {false && (
        <div>
          <label>R3F Test</label>
          <div className='flex w-[300px] h-[300px] border'>
            <R3FTest />
          </div>
        </div>
      )}
      {true && (
        <div>
          <label>ModelViewPreview</label>
          <div className='flex w-[300px] h-[300px] border'>
            <ModelViewPreview
              textureText={textureText}
              showTextureText={showTextureText}
            />
          </div>
        </div>
      )}
    </div>
  )
}

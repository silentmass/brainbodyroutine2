import { createContext } from 'react'
import { TextureType } from './definitions'

export type textureContextType = string

export function isTextureContextType (value: any): value is textureContextType {
  return (
    value === 'default' ||
    value === 'cube' ||
    value === 'text' ||
    value == 'custom' ||
    value == 'drop'
  )
}

export const TextureContext = createContext<textureContextType>('default')
export const TexturesContext = createContext<TextureType[] | null>(null)

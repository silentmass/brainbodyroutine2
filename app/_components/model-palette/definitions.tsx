import { textureContextType } from './TextureContext'

export const TEXTURE_WIDTH = 1024
export const CUBE_WIDTH = TEXTURE_WIDTH / 4

export type TextureType = {
  name: textureContextType
  src: string | null
}

export const DEFAULT_MODELS = [
  { name: 'cube' }
  // { name: 'cylinder' },
  // { name: 'card' },
  // { name: 'sphere' }
]

export const DEFAULT_TEXTURES: TextureType[] = [
  { name: 'cube', src: '/cube_texture.png' },
  // { name: 'cylinder', src: null },
  // { name: 'card', src: null },
  // { name: 'sphere', src: null },
  { name: 'default', src: '/uv_grid_opengl.jpg' }
  // { name: 'text', src: null }
]

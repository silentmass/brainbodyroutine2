import {
  DEFAULT_TEXTURES,
  TextureType
} from '@/app/_components/model-palette/definitions'
import ModelViewer from '@/app/_components/model-palette/model-viewer'
export default function Page () {
  const selectedTextures: TextureType[] = [
    ...DEFAULT_TEXTURES.filter(texture => texture.src),
    { name: 'custom', src: null }
  ]
  return (
    <div>
      <ModelViewer selectedTextures={selectedTextures} />
    </div>
  )
}

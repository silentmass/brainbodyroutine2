import { PerspectiveCamera, RenderTexture } from '@react-three/drei'
import { TEXTURE_WIDTH } from '../definitions'
import { Text } from '@react-three/drei'

export const DefaultMaterial = () => {
  const Material = () => {
    return (
      <meshStandardMaterial>
        <RenderTexture
          attach='map'
          width={TEXTURE_WIDTH}
          height={TEXTURE_WIDTH}
          anisotropy={16}
        >
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <color attach='background' args={['gray']} />
          <Text>Default</Text>
        </RenderTexture>
      </meshStandardMaterial>
    )
  }
  return <Material />
}

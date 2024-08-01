import { RenderTextureWrapper } from '../materials'
import * as THREE from 'three'

const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1, 16, 16)

export const MetalRoughnessMaterial = () => {
  return (
    <RenderTextureWrapper>
      <pointLight position={[0, 0, 1]} intensity={5} />
      <mesh geometry={SHARED_PLANE_GEOMETRY} position={[0, 0, 0]} scale={1.5}>
        <meshStandardMaterial roughness={0} metalness={0.5} color={'hotpink'} />
      </mesh>
    </RenderTextureWrapper>
  )
}

import * as THREE from 'three'
import { PerspectiveCamera, RenderTexture } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { TEXTURE_WIDTH } from '../definitions'
import { RenderTextureWrapper } from '../materials'

const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1, 16, 16)

export const OrangeBackgroundWithDodecahedron = () => {
  return (
    <RenderTextureWrapper>
      <pointLight position={[1, 1, 1]} intensity={5} />
      <mesh geometry={SHARED_PLANE_GEOMETRY} position={[0, 0, 0]} scale={1.5}>
        <meshStandardMaterial color={'orange'} />
        <Dodecahedron />
      </mesh>
    </RenderTextureWrapper>
  )
}

function Dodecahedron (props: GroupProps) {
  const meshRef = useRef<null | THREE.Mesh>(null)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return

    meshRef.current.rotation.x += delta
  })

  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        scale={clicked ? 1.5 / 10 : 1 / 10}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : '#5de4c7'} />
      </mesh>
    </group>
  )
}

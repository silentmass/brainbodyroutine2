/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Bottle (props: any) {
  const { nodes, materials } = useGLTF('/models/bottle.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder as THREE.Mesh).geometry}
        material={materials.Material}
        position={[0, 1, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/bottle.glb')
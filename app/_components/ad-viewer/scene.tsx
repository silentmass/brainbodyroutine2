'use client'
import * as THREE from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { PerspectiveCameraProps } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {
  CameraControls,
  OrbitControls,
  PresentationControls
} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import Bottle from './bottle'

export default function Scene () {
  const ref = useRef<THREE.Mesh>(null!)
  // const colorMap = useLoader(TextureLoader, 'uv_grid_opengl.jpg')
  const colorMap = useLoader(TextureLoader, 'cool_company.png')
  colorMap.colorSpace = THREE.SRGBColorSpace
  // useFrame((state, delta) => (ref.current.rotation.z += delta / 4))

  const gltfCube = useGLTF('/models/cube.glb')
  const gltfBrick = useGLTF('/models/brick.glb')

  const vertices = [
    // front
    {
      pos: [-1, -1, 1],
      norm: [0, 0, 1],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - 256 / 1024]
    }, // 0
    {
      pos: [1, -1, 1],
      norm: [0, 0, 1],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - 256 / 1024]
    }, // 1
    { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [(1024 / 2 - 256 / 2) / 1024, 1] }, // 2
    { pos: [1, 1, 1], norm: [0, 0, 1], uv: [(1024 / 2 + 256 / 2) / 1024, 1] }, // 3
    // right
    {
      pos: [1, -1, 1],
      norm: [1, 0, 0],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (1 * 256) / 1024]
    }, // 4
    {
      pos: [1, -1, -1],
      norm: [1, 0, 0],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 5
    {
      pos: [1, 1, 1],
      norm: [1, 0, 0],
      uv: [(1024 / 2 + 256 / 2 + 256) / 1024, 1 - (1 * 256) / 1024]
    }, // 6
    {
      pos: [1, 1, -1],
      norm: [1, 0, 0],
      uv: [(1024 / 2 + 256 / 2 + 256) / 1024, 1 - (2 * 256) / 1024]
    }, // 7
    // back
    {
      pos: [1, -1, -1],
      norm: [0, 0, -1],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 8
    {
      pos: [-1, -1, -1],
      norm: [0, 0, -1],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 9
    {
      pos: [1, 1, -1],
      norm: [0, 0, -1],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (3 * 256) / 1024]
    }, // 10
    {
      pos: [-1, 1, -1],
      norm: [0, 0, -1],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (3 * 256) / 1024]
    }, // 11
    // left
    {
      pos: [-1, -1, -1],
      norm: [-1, 0, 0],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 12
    {
      pos: [-1, -1, 1],
      norm: [-1, 0, 0],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (1 * 256) / 1024]
    }, // 13
    {
      pos: [-1, 1, -1],
      norm: [-1, 0, 0],
      uv: [(1024 / 2 - 256 / 2 - 256) / 1024, 1 - (2 * 256) / 1024]
    }, // 14
    {
      pos: [-1, 1, 1],
      norm: [-1, 0, 0],
      uv: [(1024 / 2 - 256 / 2 - 256) / 1024, 1 - (1 * 256) / 1024]
    }, // 15
    // top
    { pos: [1, 1, -1], norm: [0, 1, 0], uv: [(1024 / 2 - 256 / 2) / 1024, 0] }, // 16
    { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [(1024 / 2 + 256 / 2) / 1024, 0] }, // 17
    {
      pos: [1, 1, 1],
      norm: [0, 1, 0],
      uv: [(1024 / 2 - 256 / 2) / 1024, 0 + 256 / 1024]
    }, // 18
    {
      pos: [-1, 1, 1],
      norm: [0, 1, 0],
      uv: [(1024 / 2 + 256 / 2) / 1024, 0 + 256 / 1024]
    }, // 19
    // bottom
    {
      pos: [1, -1, 1],
      norm: [0, -1, 0],
      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 20
    {
      pos: [-1, -1, 1],
      norm: [0, -1, 0],
      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (2 * 256) / 1024]
    }, // 21
    {
      pos: [1, -1, -1],
      norm: [0, -1, 0],

      uv: [(1024 / 2 - 256 / 2) / 1024, 1 - (1 * 256) / 1024]
    }, // 22
    {
      pos: [-1, -1, -1],
      norm: [0, -1, 0],

      uv: [(1024 / 2 + 256 / 2) / 1024, 1 - (1 * 256) / 1024]
    } // 23
  ]
  const positions = []
  const normals = []
  const uvs = []
  for (const vertex of vertices) {
    positions.push(...vertex.pos)
    normals.push(...vertex.norm)
    uvs.push(...vertex.uv)
  }
  const typedPositions = new Float32Array(positions)
  const typedNormals = new Float32Array(normals)
  const typedUvs = new Float32Array(uvs)
  const positionNumComponents = 3
  const normalNumComponents = 3
  const uvNumComponents = 2
  const cubeVertexIndices = new Uint16Array([
    0,
    1,
    2,
    2,
    1,
    3, // front
    4,
    5,
    6,
    6,
    5,
    7, // right
    8,
    9,
    10,
    10,
    9,
    11, // back
    12,
    13,
    14,
    14,
    13,
    15, // left
    16,
    17,
    18,
    18,
    17,
    19, // top
    20,
    21,
    22,
    22,
    21,
    23 // bottom
  ])

  return (
    <>
      <ambientLight intensity={Math.PI / 4} />
      <directionalLight position={[-1, 2, 4]} intensity={2} />
      <OrbitControls
        enablePan={true}
        enableRotate={true}
        target={[0, 1.5, 0]}
      />
      {/* <mesh ref={ref} position={[0, 0, 0]} scale={1} rotation={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach={'attributes-position'}
            count={positionNumComponents}
            array={typedPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach={'attributes-normal'}
            count={normalNumComponents}
            array={typedNormals}
            itemSize={3}
          />
          <bufferAttribute
            attach={'attributes-uv'}
            count={uvNumComponents}
            array={typedUvs}
            itemSize={2}
          />
          <bufferAttribute
            attach={'index'}
            array={cubeVertexIndices}
            count={cubeVertexIndices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial map={colorMap} />
      </mesh> */}
      <Bottle
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 3, 0]}
        scale={0.5}
      />

      {/* <mesh position={[3, 0, 0]} scale={1}>
          <ambientLight intensity={Math.PI / 2} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color={'green'} />
          </lineSegments>
        </mesh> */}
    </>
  )
}

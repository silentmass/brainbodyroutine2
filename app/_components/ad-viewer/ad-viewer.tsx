'use client'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Scene from './scene'
import { PerspectiveCamera, Stats } from '@react-three/drei'

export default function AdViewer () {
  return (
    <div>
      <Canvas className='flex border' style={{ height: 300 }}>
        <PerspectiveCamera
          makeDefault
          fov={75}
          aspect={1}
          near={0.1}
          far={7}
          position={[0, 1, 3]}
        />
        <Scene />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </div>
  )
}

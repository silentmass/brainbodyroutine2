import {
  CSSProperties,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  RenderTexture,
  useProgress,
  Text,
  useTexture
} from '@react-three/drei'
import { TextureContext, TexturesContext } from './TextureContext'
import { TextureUvContext } from './TextureUvContext'
import { CUBE_UVS_SINGLE_TEXTURE } from './uvs'
import { MaterialContext } from './MaterialContext'
import { GetCustomMaterial, StimulusButtonWrapper } from './materials'
import { TEXTURE_WIDTH } from './definitions'

// Enable Color Management globally
THREE.ColorManagement.enabled = true

export const UVS = new THREE.BufferAttribute(
  new Float32Array(CUBE_UVS_SINGLE_TEXTURE),
  2
)

export const sharedCubeGeometry = new THREE.BoxGeometry(1, 1, 1)
export const sharedCubeGeometryUvSingleTexture = new THREE.BoxGeometry(1, 1, 1)
sharedCubeGeometryUvSingleTexture.setAttribute('uv', UVS)

export const sharedMaterial = new THREE.MeshStandardMaterial({
  color: 'orange'
})

// Function to create and attach the UV buffer attribute if needed
export const createGeometryWithUV = (isCubeUvSingleTexture: boolean) => {
  const geometry = sharedCubeGeometry.clone()
  if (isCubeUvSingleTexture) {
    geometry.setAttribute('uv', UVS)
  }
  return geometry
}

// Shadermaterial

export const FOV = 25
export const CAMERA_DISTANCE =
  (1 / 2 / Math.tan((FOV / 2 / 180) * Math.PI)) *
  Math.tan((FOV / 2 / 180) * Math.PI)

export const NUM_PARTICLES = 128 * 4

export const length = NUM_PARTICLES * NUM_PARTICLES
export const particles = new Float32Array(length * 3)

export function initialPositions (
  particles: Float32Array,
  length: number,
  size: number
) {
  for (let i = 0; i < length; i++) {
    let i3 = i * 3
    particles[i3 + 0] = (i % size) / size
    particles[i3 + 1] = i / size / size
  }
  return particles
}

// Generate our positions attributes array
export const PARTICLES_POSITION = initialPositions(
  particles,
  length,
  NUM_PARTICLES
)

export const SCENE = new THREE.Scene()
export const CAMERA = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  1 / Math.pow(2, 53),
  1
)
export const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0
])
export const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])

export default function ModelViewPreview ({
  textureText,
  showTextureText
}: {
  textureText: string
  showTextureText: boolean
}) {
  const stimulusRef = useRef<() => void | null>(null)
  const controlsRef = useRef(null)

  const triggerStimulusClick = () => {
    if (stimulusRef.current) {
      stimulusRef.current()
    }
  }

  const textureName = useContext(TextureContext)
  const textures = useContext(TexturesContext)
  const materialName = useContext(MaterialContext)
  const isCubeUvSingleTexture = useContext(TextureUvContext)
  // const controls = useThree(state => state.controls)

  const textureSrc = textures
    ? textures?.find(texture => texture.name === textureName)?.src
    : '/uv_grid_opengl.jpg'

  const geometry = useMemo(
    () =>
      isCubeUvSingleTexture
        ? sharedCubeGeometryUvSingleTexture
        : sharedCubeGeometry,
    [isCubeUvSingleTexture]
  )

  useEffect(() => {
    if (!controlsRef.current) return
    // Log information from OrbitControls
    console.log('OrbitControls Rotation:', controlsRef.current)
  }, [controlsRef])

  return (
    <>
      <StimulusButtonWrapper
        onClick={triggerStimulusClick}
        visible={materialName === 'chaosToCircle'}
      >
        <Canvas className='flex'>
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera
              makeDefault
              fov={25}
              aspect={1}
              near={0.1}
              far={10}
              position={[2, 2, 2]}
            />
            <ambientLight intensity={5.0} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              target={[0, 0, 0]}
              autoRotate={false}
              // minPolarAngle={Math.PI / 2}
              // maxPolarAngle={Math.PI / 2}
            />
            {/* <axesHelper args={[5]} /> */}
            <mesh
              position={[0, 0, 0]}
              scale={[1, 1, 1]}
              visible={textureName !== 'custom' ? true : false}
              geometry={geometry}
            >
              {textureSrc ? (
                <DefaultmeshStandardMaterial textureSrc={textureSrc} />
              ) : (
                <meshStandardMaterial color={'hotpink'} />
              )}
            </mesh>
            <mesh
              position={[0, 0, 0]}
              scale={[1.01, 1.01, 1.01]}
              visible={textureName === 'custom' ? true : false}
              geometry={geometry}
            >
              <GetCustomMaterial
                materialName={materialName}
                stimulusRef={stimulusRef}
              />
            </mesh>
            <mesh
              scale={[1.02, 1.02, 1.02]}
              visible={showTextureText}
              geometry={geometry}
            >
              <meshStandardMaterial transparent>
                <RenderTexture
                  attach='map'
                  width={TEXTURE_WIDTH}
                  height={TEXTURE_WIDTH}
                  anisotropy={16}
                >
                  <Text fontSize={2} color={'white'}>
                    {textureText}
                  </Text>
                </RenderTexture>
              </meshStandardMaterial>
            </mesh>
            <Preload all />
          </Suspense>
        </Canvas>
      </StimulusButtonWrapper>
    </>
  )
}

export function Loader () {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <Html center className='z-0'>
      <p>{progress} % loaded</p>
    </Html>
  )
}

export function DefaultmeshStandardMaterial ({
  textureSrc
}: {
  textureSrc: string
}) {
  const tex = useTexture(textureSrc)
  const memoizedTex = useMemo(() => tex, [textureSrc])
  return <meshStandardMaterial map={memoizedTex} />
}

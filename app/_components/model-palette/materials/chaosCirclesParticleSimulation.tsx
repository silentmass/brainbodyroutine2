import simulationVertexShader from '@/app/_components/model-palette/materials/shaders/chaosCirclesParticleSimulation.vert'
import simulationFragmentShader from '@/app/_components/model-palette/materials/shaders/chaosCirclesParticleSimulation.frag'
import * as THREE from 'three'

const getRandomDataSphere = (width: number, height: number) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4
  const data = new Float32Array(length)

  for (let i = 0; i < length; i++) {
    const stride = i * 4

    const distance = Math.sqrt(Math.random()) * 2.0
    const theta = THREE.MathUtils.randFloatSpread(360)
    const phi = THREE.MathUtils.randFloatSpread(360)

    data[stride] = distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi)
    data[stride + 2] = distance * Math.cos(theta)
    data[stride + 3] = 1.0 // this value will not have any impact
  }

  return data
}

const getRandomDataBox = (width: number, height: number) => {
  var len = width * height * 4
  var data = new Float32Array(len)

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4

    // Between -1 and 1
    data[stride] = (Math.random() - 0.5) * 2.0
    data[stride + 1] = (Math.random() - 0.5) * 2.0
    data[stride + 2] = (Math.random() - 0.5) * 2.0
    data[stride + 3] = 1.0
  }
  return data
}

const getRandomDataPlane = (width: number, height: number) => {
  var len = width * height * 4
  var data = new Float32Array(len)

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4
    data[stride] = Math.random()
    data[stride + 1] = 0.0
    data[stride + 2] = Math.random()
    data[stride + 3] = 1.0
  }
  return data
}

const getFixedUvPlane = (width: number, height: number) => {
  var len = width * height * 4
  var data = new Float32Array(len)

  for (let u = 0; u < width; u++) {
    for (let v = 0; v < height; v++) {
      let stride = u * len + v * 4
      data[stride] = u / (width - 1)
      data[stride + 1] = 0
      data[stride + 2] = v / (height - 1)
      data[stride + 3] = 1.0
    }
  }
  return data
}

const getCirclesDataPlane = (width: number, height: number) => {
  var len = width * width * 4
  var data = new Float32Array(len)
  var origin = [0.5, 0, 0.5]

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4
    data[stride] = Math.random()
    data[stride + 1] = 0.0
    data[stride + 2] = Math.random()
    data[stride + 3] = 1.0
  }

  // Distance from origin

  var freq = 16.0
  var phase = 1.5 * Math.PI

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4
    const xyDistance = Math.sqrt(
      Math.pow(origin[0] - data[stride], 2) +
        Math.pow(origin[2] - data[stride + 2], 2)
    )

    if (xyDistance < 1) {
      data[stride + 1] =
        0.5 * (Math.sin(2 * xyDistance * Math.PI * freq + phase) + 1)
    } else {
      data[stride + 1] = 0
    }
  }

  return data
}

class ChaosCirclesParticleSimulationMaterial extends THREE.ShaderMaterial {
  constructor (size: number) {
    const positionsTextureA = new THREE.DataTexture(
      getRandomDataPlane(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    positionsTextureA.needsUpdate = true

    const positionsTextureB = new THREE.DataTexture(
      getCirclesDataPlane(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    positionsTextureB.needsUpdate = true

    const positionsTextureC = new THREE.DataTexture(
      getFixedUvPlane(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    positionsTextureC.needsUpdate = true

    const simulationUniforms = {
      positionsA: { value: positionsTextureA },
      positionsB: { value: positionsTextureB },
      positionsC: { value: positionsTextureC },
      uFrequency: { value: 0.1 },
      uTime: { value: 0 },
      uStimulusTime: { value: 0 }
    }

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader
    })
  }
}

export default ChaosCirclesParticleSimulationMaterial

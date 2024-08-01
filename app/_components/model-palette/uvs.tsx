import { TEXTURE_WIDTH, CUBE_WIDTH } from './definitions'

const structuredCubeUVs = [
  // Right face
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 0 left top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 1
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 1.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 2 right top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 3
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 4 left bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 5
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 1.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 6 right bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 7
  },
  // Left face
  {
    u: (0.5 * TEXTURE_WIDTH - 1.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 8 left top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 9
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 10 right top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 11
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 1.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 12 left bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 13
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 14 right bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 15
  },
  // Top face
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 16 left top
    v: 1 // 17
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 18 right top
    v: 1 // 19
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 20 left bottom
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH
  }, // 21
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 22 right bottom
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 23
  },
  // Bottom face
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 24 left top
    v: (2 * CUBE_WIDTH) / TEXTURE_WIDTH // 25
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 26 right top
    v: (2 * CUBE_WIDTH) / TEXTURE_WIDTH // 27
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 28 left bottom
    v: CUBE_WIDTH / TEXTURE_WIDTH // 29
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 30 right bottom
    v: CUBE_WIDTH / TEXTURE_WIDTH // 31
  },
  // Front face
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 32 left top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 33
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 34 right top
    v: (TEXTURE_WIDTH - CUBE_WIDTH) / TEXTURE_WIDTH // 35
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 36 left bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 37
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 38 right bottom
    v: (TEXTURE_WIDTH - 2 * CUBE_WIDTH) / TEXTURE_WIDTH // 39
  },
  // Back face
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 40 left top
    v: 0 // 41
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 42 right top
    v: 0 // 43
  },
  {
    u: (0.5 * TEXTURE_WIDTH + 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 44 left bottom
    v: CUBE_WIDTH / TEXTURE_WIDTH // 45
  },
  {
    u: (0.5 * TEXTURE_WIDTH - 0.5 * CUBE_WIDTH) / TEXTURE_WIDTH, // 46 right bottom
    v: CUBE_WIDTH / TEXTURE_WIDTH // 47
  }
]

const flattenedUVs = structuredCubeUVs.flatMap(({ u, v }) => [u, v])
export const CUBE_UVS_SINGLE_TEXTURE = new Float32Array(flattenedUVs)

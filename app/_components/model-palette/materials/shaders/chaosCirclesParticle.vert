
uniform sampler2D uPositions;

varying float vDistanceX;
varying float vDistanceY;
varying float vDistanceZ;
varying float modX;
varying float modY;
varying float time;

void main() {
  // uPositions gets updated in useFrame every cycle from renderTarget.texture
  vec4 pos = texture2D(uPositions, position.xy);

  vDistanceX = pos.x;
  vDistanceY = pos.y;
  vDistanceZ = pos.z;
  time = pos.a;

  // Gaussian mask
  modX = ((0.5 * sin(pos.x * 2.0 * 3.14 + 1.5 * 3.14)) + 0.5);
  modY = ((0.5 * sin(pos.z * 2.0 * 3.14 + 1.5 * 3.14)) + 0.5);

  vec4 modelPosition =
      modelMatrix * vec4(vec3(pos.x, 0.2 * pos.y * modX * modY, pos.z), 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 3.0;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0 / 64.0), position.x) + 0.5;
}

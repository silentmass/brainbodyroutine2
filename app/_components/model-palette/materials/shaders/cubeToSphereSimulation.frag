precision mediump float;

uniform sampler2D positionsA;
uniform sampler2D positionsB;
uniform float uTime;
uniform float uFrequency;

varying vec2 vUv;

void main() {
  // Between 0 and 1
  float time = 0.5 * (sin(uTime * uFrequency) + 1.0);

  vec3 spherePositions = texture2D(positionsA, vUv).rgb;
  vec3 boxPositions = texture2D(positionsB, vUv).rgb;

  vec3 pos = mix(boxPositions, spherePositions, time);

  gl_FragColor = vec4(pos, 1.0);
}

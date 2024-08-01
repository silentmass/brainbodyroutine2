precision mediump float;

varying float vDistanceX;
varying float vDistanceY;
varying float vDistanceZ;
varying float modX;
varying float modY;
varying float time;

void main() {

  float phase = mod(time * 3.0, 3.0);

  vec3 color;
  if (phase < 1.0) {
    // Transition from red (1, 0, 0) to green (0, 1, 0)
    color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), phase);
  } else if (phase < 2.0) {
    // Transition from green (0, 1, 0) to blue (0, 0, 1)
    color = mix(vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0), phase - 1.0);
  } else {
    // Transition from blue (0, 0, 1) to red (1, 0, 0)
    color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), phase - 2.0);
  }

  // Gaussian mask
  color = vec3(color.x * modX * modY, vDistanceY * color.y * modX * modY,
               color.z * modX * modY);
  // color = mix(color, color2 * modX * modY, vDistanceY);
  gl_FragColor = vec4(color, 1.0);
}
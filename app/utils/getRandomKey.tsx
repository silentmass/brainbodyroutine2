export function getNewRandomKey (prefix = '') {
  return `${prefix}_${Math.round(10000 * Math.random())}`
}

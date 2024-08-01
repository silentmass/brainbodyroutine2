export function sliceText (
  currentText: string,
  visibleHeight: null | number,
  totalHeight: null | number
) {
  if (!visibleHeight || !totalHeight) {
    return currentText.slice(0, 50) + '...'
  }

  if (Number(visibleHeight) / Number(totalHeight) > 0.9) {
    return currentText
  }

  return `${currentText.slice(0, 50)} ...`
}

export function isStringEmpty (testString: string) {
  return (
    testString == '' ||
    (testString.search(/^ /) !== -1 &&
      testString.split('\n') &&
      testString.search(/\n$/) !== -1)
  )
}

export const messageToList: (message: any) => string[] = (message: any) => {
  if (typeof message !== 'object' || message === null) return [`${message}`]

  const result: string[] = []

  const traverse = (obj: any, path: string) => {
    if (typeof obj !== 'object' || obj === null) {
      result.push(`${path}: ${obj}`)
      return
    }

    for (const [key, value] of Object.entries(obj)) {
      traverse(value, path ? `${path}.${key}` : key)
    }
  }

  traverse(message, '')
  return result
}

export function checkListsDiffer (
  testList: string[] | number[],
  referenceList: string[] | number[]
) {
  if (testList.length !== referenceList.length) {
    return true
  }

  for (let i = 0; i < testList.length; i++) {
    if (testList[i] !== referenceList[i]) {
      return true
    }
  }

  return false
}

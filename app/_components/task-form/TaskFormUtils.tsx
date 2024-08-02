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

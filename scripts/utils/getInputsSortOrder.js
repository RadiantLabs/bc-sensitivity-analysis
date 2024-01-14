// Return a sorted array of xmlPaths based on id
// Sorting mutates the array. Not a big deal but I don't like side effects. So clone it at the beginning.
export function getInputsSortOrder(inputsConfig) {
  const clonedArray = [...inputsConfig]
  return clonedArray.sort((a, b) => a.id - b.id).map((item) => item.xmlPath)
}

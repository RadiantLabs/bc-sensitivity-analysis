// Return a sorted array of xmlPaths based on id
// Sorting mutates the array. Not a big deal but I don't like side effects. So clone it at the beginning.
export function getInputVectorSortOrder(modelInputsMetadata) {
  const clonedArray = [...modelInputsMetadata]
  return clonedArray
    .sort((a, b) => a.inputOrder - b.inputOrder) // sort by inputOrder
    .map((item) => item.xmlPath) // return only the xmlPath
}

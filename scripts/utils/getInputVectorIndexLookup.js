// Create a fast looking between xmlPath and the input vector index In JS:
// object lookup by key is 0(1).
// Searching an array to find the index is 0(n). (where n in our case is ~500, the length of the input vector)
// This is done on slide change so it's worth it to create this lookup table.
export function getInputVectorIndexLookup(modelInputsMetadata) {
  return modelInputsMetadata.reduce((acc, input) => {
    const { inputOrder } = input
    acc[input.xmlPath] = inputOrder
    return acc
  }, {})
}

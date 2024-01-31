export function getInputVectorIndexLookup(modelInputsMetadata) {
  return modelInputsMetadata.reduce((acc, input) => {
    const { inputOrder } = input
    acc[input.xmlPath] = inputOrder
    return acc
  }, {})
}

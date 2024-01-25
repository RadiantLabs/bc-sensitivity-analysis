export function getInputCodeToXmlPathLookup(modelInputsMetadata) {
  return modelInputsMetadata.reduce((acc, input) => {
    acc[input.InputCode] = input.xmlPath
    return acc
  }, {})
}

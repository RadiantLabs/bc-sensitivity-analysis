export function getInputCodeToXmlPathLookup(modelInputsMetadata) {
  return modelInputsMetadata.reduce((acc, input) => {
    acc[input.inputCode] = input.xmlPath
    return acc
  }, {})
}

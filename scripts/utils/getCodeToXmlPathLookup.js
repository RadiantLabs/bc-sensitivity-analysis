export function getCodeToXmlPathLookup(modelInputsMetadata) {
  return modelInputsMetadata.reduce((acc, input) => {
    acc[input.code] = input.xmlPath
    return acc
  }, {})
}

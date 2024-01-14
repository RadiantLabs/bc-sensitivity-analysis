export function getCodeToXmlPathLookup(inputsConfig) {
  return inputsConfig.reduce((acc, input) => {
    acc[input.code] = input.xmlPath
    return acc
  }, {})
}

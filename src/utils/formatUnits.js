export function formatUnits(units) {
  if (!units) {
    return ''
  }
  return units
    .replace(/ft2/g, 'ft²') // square feet
    .replace(/ft3/g, 'ft³') // cubic feet
}

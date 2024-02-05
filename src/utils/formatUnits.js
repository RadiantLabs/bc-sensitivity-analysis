export function formatUnits(units) {
  switch (true) {
    case units === 'ft^2' || units === 'ft2':
      return 'ft²'
    case units === 'ft^3' || units === 'ft3':
      return 'ft³'
    default:
      return units
  }
}

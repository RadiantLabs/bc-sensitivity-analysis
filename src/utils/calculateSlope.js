import round from 'lodash/round'

export function calculateSlope(predictedData) {
  return predictedData.map((barData, barIndex) => {
    const isLastBar = barIndex === predictedData.length - 1

    const adjacentBar = isLastBar
      ? predictedData[barIndex - 1] // use the bar to the left to calculate slope
      : predictedData[barIndex + 1] // use the bar to the right to calculate slope

    const deltaY = adjacentBar.predicted - barData.predicted
    const deltaX = adjacentBar.inputValue - barData.inputValue
    return round(deltaY / deltaX, 2) // slope
  })
}

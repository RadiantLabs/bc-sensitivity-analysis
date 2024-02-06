import round from 'lodash/round'
import map from 'lodash/map'

export function calculateSlope(predictedData) {
  const slopes = predictedData.map((barData, barIndex) => {
    const isNotLastBar = barIndex < predictedData.length - 1
    const { deltaX, deltaY } = isNotLastBar ? getDeltas(barData, barIndex, predictedData) : getLastDeltas(barData, barIndex, predictedData)
    return deltaY / deltaX // slope
  })
  return map(slopes, (slope) => round(slope, 2))
}

// To calculate slope, compare current bar with the bar to the right
function getDeltas(barData, barIndex, predictedData) {
  const nextBar = predictedData[barIndex + 1]
  const deltaY = nextBar.predicted - barData.predicted
  const deltaX = nextBar.inputValue - barData.inputValue
  return { deltaX, deltaY }
}

// For the last bar,use the previous bar to calculate slope
function getLastDeltas(barData, barIndex, predictedData) {
  const prevBar = predictedData[barIndex - 1]
  const deltaY = barData.predicted - prevBar.predicted
  const deltaX = barData.inputValue - prevBar.inputValue
  return { deltaX, deltaY }
}

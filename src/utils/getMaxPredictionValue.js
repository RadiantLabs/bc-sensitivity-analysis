// Find the max value from the predicted data set, rounded up to the nearest 100
// This is to set the y axis top
export function getMaxPredictionValue(predictedDataSet) {
  if (!predictedDataSet) {
    return null
  }
  const allPredictions = Object.values(predictedDataSet)
    .flat()
    .map((item) => item.predicted)
  const max = Math.max(...allPredictions)
  return Math.ceil(max / 100) * 100 // round up to nearest 100
}

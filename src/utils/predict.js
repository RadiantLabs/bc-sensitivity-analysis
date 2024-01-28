// Will use Tensorflow. Needs to be async
// See Inference.jsx.
export function predict(chartDataSet, stepType) {
  return chartDataSet.reduce((acc, chartItem) => {
    acc[chartItem.xmlPath] = chartItem[stepType].map((inputStep) => {
      return {
        inputValue: inputStep,
        predicted: inputStep,
      }
    })
    return acc
  }, {})
}

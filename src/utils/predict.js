// Will use Tensorflow. Needs to be async
// See Inference.jsx.
export function predict(chartDataSet) {
  return chartDataSet.reduce((acc, chartItem) => {
    acc[chartItem.xmlPath] = chartItem.evenSteps.map((inputStep) => {
      return {
        inputValue: inputStep,
        predicted: inputStep,
      }
    })
    return acc
  }, {})
}

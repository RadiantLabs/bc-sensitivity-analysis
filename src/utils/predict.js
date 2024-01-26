// Will use Tensorflow. Needs to be async
// See Inference.jsx.
export function predict(chartDataSet) {
  return chartDataSet.map((chartItem) => {
    return chartItem.evenSteps.map((inputStep) => {
      return {
        inputValue: inputStep,
        predicted: inputStep,
      }
    })
  })
}

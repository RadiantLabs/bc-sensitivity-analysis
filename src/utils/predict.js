import isEmpty from 'lodash/isEmpty'
import random from 'lodash/random'

/* Return an object like:
  BuildingDetails.BuildingSummary.BuildingConstruction.ConditionedFloorArea: [
    {inputValue: 875, predicted: 875}
    {inputValue: 1004, predicted: 1004}
    {inputValue: 1132, predicted: 1132}
  ],
  BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistCrawlspaceVentedExposed1].Area: []
    {inputValue: 0, predicted: 0}
    {inputValue: 9, predicted: 9}
    {inputValue: 17, predicted: 17}
  ]
*/
export function predict(chartDataSet, model, sliderValues, stepType) {
  if (isEmpty(model) || isEmpty(chartDataSet) || isEmpty(sliderValues) || isEmpty(stepType)) {
    return null
  }
  return chartDataSet.reduce((acc, chartItem) => {
    console.log('chartItem :>> ', chartItem)
    console.log('sliderValues :>> ', sliderValues)
    const { xmlPath } = chartItem
    acc[xmlPath] = chartItem[stepType].map((inputStep) => {
      return {
        inputValue: inputStep,
        predicted: inputStep + random(100, 200),
      }
    })
    return acc
  }, {})
}

// -------------------------------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------------------------------
// async function runInference(model, inputs) {
// }

import isEmpty from 'lodash/isEmpty'

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
export function predict(chartDataSet, model, stepType) {
  if (isEmpty(model) || isEmpty(chartDataSet) || isEmpty(stepType)) {
    return null
  }
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

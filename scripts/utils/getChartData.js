import _ from 'lodash'

/* Return
  [
    {
      xmlPath: 'BuildingConstruction.ConditionedFloorArea',
      label: 'Conditioned Floor Area',
      percentileSteps: [875, 1000, 1090, 1160, 1226, 1295, 1360, 1428, 1500, 1580, 1671, 1770, 1874, 1992, 2128, 2287, 2500, 2800, 3320],
      evenSteps: [875, ,,, 3320]
    }
  ]

*/
export function getChartData(percentiles, xmlPathLabels) {
  return _.map(percentiles, (percentile, xmlPath) => {
    const label = xmlPathLabels[xmlPath]
    const percentileSteps = _.map(percentiles[xmlPath], Math.round)
    const evenSteps = getEvenSteps(percentileSteps)
    return { xmlPath, label, percentileSteps, evenSteps }
  })
}

function getEvenSteps(percentileSteps) {
  const min = _.min(percentileSteps)
  const max = _.max(percentileSteps)
  const steps = 20
  const stepSize = (max - min) / (steps - 1)
  const range = _.range(min, max + stepSize, stepSize)
  return _.map(range, Math.round)
}

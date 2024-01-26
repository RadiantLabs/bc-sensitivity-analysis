import map from 'lodash/map'
import pick from 'lodash/pick'
import range from 'lodash/range'

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
export function getChartDataSet(percentiles, xmlPathLabels, topRanked) {
  // Only output the chart data that we will be displaying
  const topRankedPercentiles = pick(percentiles, topRanked)

  return map(topRankedPercentiles, (percentile, xmlPath) => {
    const label = xmlPathLabels[xmlPath]
    const percentileSteps = map(percentiles[xmlPath], Math.round)
    const evenSteps = getEvenSteps(percentileSteps)
    return { xmlPath, label, percentileSteps, evenSteps }
  })
}

function getEvenSteps(percentileSteps) {
  const min = Math.min(percentileSteps)
  const max = Math.max(percentileSteps)
  const steps = 20
  const stepSize = (max - min) / (steps - 1)
  const stepRange = range(min, max + stepSize, stepSize)
  return map(stepRange, Math.round)
}

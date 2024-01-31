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
export function getChartDataSet(percentiles, xmlPathLabels, topRanked, inputVectorSortOrder) {
  // Only output the chart data that we will be displaying
  const topRankedPercentiles = _.pick(percentiles, topRanked)

  return _.map(topRankedPercentiles, (percentile, xmlPath) => {
    const label = xmlPathLabels[xmlPath]
    const percentileSteps = _.map(percentiles[xmlPath], Math.round)
    const evenSteps = getEvenSteps(percentileSteps)
    const inputVectorIndex = getInputVectorIndex(xmlPath, inputVectorSortOrder)
    return {
      xmlPath,
      inputVectorIndex,
      label,
      percentileSteps,
      evenSteps,
    }
  })
}

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
function getEvenSteps(percentileSteps) {
  const min = Math.min(...percentileSteps)
  const max = Math.max(...percentileSteps)
  const steps = 20
  const stepSize = (max - min) / (steps - 1)
  const stepRange = _.range(min, max + stepSize, stepSize)
  return _.map(stepRange, Math.round)
}

function getInputVectorIndex(xmlPath, inputVectorSortOrder) {
  const index = inputVectorSortOrder.indexOf(xmlPath)
  if (index === -1) {
    console.error('xmlPath not found in inputVectorSortOrder', xmlPath)
  }
  return index
}

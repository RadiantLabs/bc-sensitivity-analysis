import _ from 'lodash'

/* Return
  [
    {
      xmlPath: 'BuildingConstruction.ConditionedFloorArea',
      label: 'Conditioned Floor Area',
      ...
      percentileSteps: [875, 1000, 1090, 1160, 1226, 1295, 1360, 1428, 1500, 1580, 1671, 1770, 1874, 1992, 2128, 2287, 2500, 2800, 3320],
      evenSteps: [875, ,,, 3320]
    }
  ]
*/
export function getChartDataSet(modelInputsMetadata, percentiles, opts) {
  const { chartCount, useActionable } = opts

  // Sort and filter based on attributes in metadata
  const topRanked = getTopRank(modelInputsMetadata, chartCount, useActionable)

  // Return original data object with additional steps for the sliders
  return topRanked.map((metaData) => {
    const { xmlPath } = metaData
    const percentileSteps = getPercentileSteps(percentiles[xmlPath])
    const evenSteps = getEvenSteps(percentileSteps, xmlPath)
    return {
      ...metaData,
      percentileSteps,
      evenSteps,
    }
  })
}

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
// isRelevant is something that Kelly determined.
// For example, there are a lot of redundant inputs, like conditioned floor area and conditioned floor
// area served. Or window azimuth is not relevant because we have east, west, north, south, window area.
function getTopRank(modelInputsMetadata, chartCount, useActionable) {
  const newMetadataArray = [...modelInputsMetadata] // sorting may mutate in place, bad form
  const filtered = newMetadataArray
    .filter((item) => _.isNumber(item.importanceRank))
    .filter((item) => _.isEmpty(item.categoricalValue)) // Change this later when I build UI for categorical.
    .filter((item) => Boolean(item.isRelevant))
    .filter((item) => (useActionable ? Boolean(item.isActionable) : true))
    .sort((a, b) => a.importanceRank - b.importanceRank)
    .slice(0, chartCount) // Return new array from index 0 to chartCount
  return filtered
}

function getEvenSteps(percentileSteps, xmlPath) {
  const min = Math.min(...percentileSteps)
  const max = Math.max(...percentileSteps)
  const steps = 20
  const stepSize = (max - min) / (steps - 1)
  const stepRange = _.take(_.range(min, max + stepSize, stepSize), steps) // Edge cases where we might get more than 20
  if (stepRange.length !== steps) {
    throw new Error(`stepRange.length !== steps, xmlPath: ${xmlPath}, percentileSteps: ${percentileSteps}`)
  }
  return _.map(stepRange, Math.round) // TODO: use metadata to decide precision
}

function getPercentileSteps(percentileSteps) {
  return percentileSteps.map((step) => Math.round(step)) // TODO: use metadata to decide precision
}

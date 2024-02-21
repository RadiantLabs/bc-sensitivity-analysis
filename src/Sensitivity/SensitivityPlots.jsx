import Grid from '@mui/material/Grid'
import SensitivityPlot from './SensitivityPlot'
import isEmpty from 'lodash/isEmpty'
import { Typography } from '@mui/material'

import { useStore, usePredictedDataSet } from '../useStore'
import { formatUnits } from '../utils/formatUnits'

const SensitivityPlots = () => {
  const { chartLayout, chartDataSet } = useStore((state) => ({
    chartLayout: state.chartLayout,
    chartDataSet: state.chartDataSet,
  }))
  const predictedDataSet = usePredictedDataSet()

  // Determine the grid size based on the chart layout
  const gridSize = chartLayout === 'single' ? 12 : chartLayout === 'double' ? 6 : 4

  if (isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Grid container spacing={1} marginTop={2}>
        {chartDataSet.map((chartData, index) => {
          const { xmlPath, label, units } = chartData
          const predictedData = predictedDataSet[xmlPath]
          return (
            <Grid container item xs={gridSize} style={{ padding: 0 }} key={index}>
              <Typography
                variant='h6'
                fontSize={fontSizeByColumnLayout(chartLayout)}
                align='left'
                marginTop={1}
                paddingLeft={1}
              >
                {label}
                {chartLayout === 'single' && <small>&nbsp;({formatUnits(units)})</small>}
              </Typography>
              <SensitivityPlot chartId={xmlPath} predictedData={predictedData} chartData={chartData} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default SensitivityPlots

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
function fontSizeByColumnLayout(chartLayout) {
  switch (chartLayout) {
    case 'single':
      return '0.9rem'
    case 'double':
      return '0.8rem'
    case 'triple':
      return '0.7rem'
    default:
      return '0.9rem'
  }
}

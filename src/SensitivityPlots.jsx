import Grid from '@mui/material/Grid'
import SensitivityPlot from './SensitivityPlot'
import isEmpty from 'lodash/isEmpty'
import { useStore, usePredictedDataSet } from './useStore'
import { formatUnits } from './utils/formatUnits'

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
      <Grid container spacing={1}>
        {chartDataSet.map((chartData, index) => {
          const { xmlPath, label, units } = chartData
          const predictedData = predictedDataSet[xmlPath]
          return (
            <Grid container item xs={gridSize} style={{ paddingTop: 0, paddingBottom: 0 }} key={index}>
              <div>
                <h5 style={{ marginBottom: 0 }}>
                  {label}
                  {chartLayout === 'single' && <small>&nbsp;({formatUnits(units)})</small>}
                </h5>
                <SensitivityPlot chartId={xmlPath} predictedData={predictedData} chartData={chartData} />
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default SensitivityPlots

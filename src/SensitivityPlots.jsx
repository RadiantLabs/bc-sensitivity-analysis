import SensitivityPlot from './SensitivityPlot'
import isEmpty from 'lodash/isEmpty'
import { useStore, usePredictedDataSet } from './useStore'

const SensitivityPlots = () => {
  const { chartDataSet } = useStore((state) => ({
    chartDataSet: state.chartDataSet,
  }))
  const predictedDataSet = usePredictedDataSet()

  if (isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <>
      {chartDataSet.map((chartData, index) => {
        const { xmlPath, label } = chartData
        const predictedData = predictedDataSet[xmlPath]
        return (
          <div key={index}>
            <h3>{label}</h3>
            <SensitivityPlot chartId={xmlPath} predictedData={predictedData} chartData={chartData} />
          </div>
        )
      })}
    </>
  )
}

export default SensitivityPlots

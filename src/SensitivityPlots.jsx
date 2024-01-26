import SensitivityPlot from './SensitivityPlot'
import isEmpty from 'lodash/isEmpty'
import { useStore } from './useStore'

const SensitivityPlots = () => {
  const { chartDataSet, predictedDataSet } = useStore((state) => ({
    chartDataSet: state.chartDataSet,
    predictedDataSet: state.predictedDataSet,
  }))

  if (isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {chartDataSet.map((data, index) => {
        const predictedData = predictedDataSet[index]
        const { xmlPath, label } = data
        return (
          <div key={index}>
            <h3>{label}</h3>
            <SensitivityPlot chartId={xmlPath} predictedData={predictedData} chartData={data} />
          </div>
        )
      })}
    </div>
  )
}

export default SensitivityPlots

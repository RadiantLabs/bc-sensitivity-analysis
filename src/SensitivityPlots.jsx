import SensitivityPlot from './SensitivityPlot'
import _ from 'lodash'
import { useStore } from './useStore'

const SensitivityPlots = () => {
  const { chartData, predictedDataSet } = useStore((state) => ({
    chartData: state.chartData,
    predictedDataSet: state.predictedDataSet,
  }))

  if (_.isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {chartData.map((data, index) => {
        const predictedData = predictedDataSet[index]
        return (
          <div key={index}>
            <h3>Chart {index + 1}</h3>
            <SensitivityPlot chartId={index} predictedData={predictedData} />
          </div>
        )
      })}
    </div>
  )
}

export default SensitivityPlots

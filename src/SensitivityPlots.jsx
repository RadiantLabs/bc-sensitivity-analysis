import { useEffect } from 'react'
import PropTypes from 'prop-types'
import SensitivityPlot from './SensitivityPlot'
import _ from 'lodash'
import { store } from './store'

const SensitivityPlots = ({ chartDataProp, initialPredictedDataSetProp }) => {
  const { chartData, initialPredictedDataSet, setChartData, setInitialPredictedDataSet } = store((state) => ({
    chartData: state.chartData,
    initialPredictedDataSet: state.initialPredictedDataSet,
    setChartData: state.setChartData,
    setInitialPredictedDataSet: state.setInitialPredictedDataSet,
  }))

  useEffect(() => {
    setChartData(chartDataProp)
    setInitialPredictedDataSet(initialPredictedDataSetProp)
  }, [chartDataProp, initialPredictedDataSetProp, setChartData, setInitialPredictedDataSet])

  if (_.isEmpty(initialPredictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {chartData.map((data, index) => {
        const predictedData = initialPredictedDataSet[index]
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

SensitivityPlots.propTypes = {
  chartDataProp: PropTypes.arrayOf(
    PropTypes.shape({
      xmlPath: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      percentileSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
      evenSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
  initialPredictedDataSetProp: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        inputValue: PropTypes.number.isRequired,
        predicted: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
}

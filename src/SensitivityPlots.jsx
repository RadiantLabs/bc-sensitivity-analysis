import { useState } from 'react'
import PropTypes from 'prop-types'
import SensitivityPlot from './SensitivityPlot'
import _ from 'lodash'

const SensitivityPlots = ({ chartData, initialPredictedDataSet }) => {
  const [predictedDataSet, setPredictedDataSet] = useState(initialPredictedDataSet)

  const handleSliderChangeByChart = async (newSliderVal, chartId) => {
    const updatedPredictedDataSet = await predictData(newSliderVal, chartData, predictedDataSet)
    setPredictedDataSet(updatedPredictedDataSet)
  }

  if (_.isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {chartData.map((chartData, index) => {
        const predictedData = predictedDataSet[index]
        return (
          <div key={index}>
            <h3>Chart {index + 1}</h3>
            <SensitivityPlot
              chartId={index} //
              chartData={chartData}
              predictedData={predictedData}
              onSliderChange={handleSliderChangeByChart}
            />
          </div>
        )
      })}
    </div>
  )
}

export default SensitivityPlots

async function predictData(newSliderVal, chartData, predictedData) {
  return predictedData
}

SensitivityPlots.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      xmlPath: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      percentileSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
      evenSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
  initialPredictedDataSet: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        inputValue: PropTypes.number.isRequired,
        predicted: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
}

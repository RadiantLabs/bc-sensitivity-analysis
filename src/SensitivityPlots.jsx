import { useState } from 'react'
import PropTypes from 'prop-types'
import SensitivityPlot from './SensitivityPlot'
import _ from 'lodash'

const SensitivityPlots = ({ initialChartsData, initialPredictedDataSet }) => {
  const [chartsData, setChartsData] = useState(initialChartsData)
  const [predictedDataSet, setPredictedDataSet] = useState(initialPredictedDataSet)

  const handleSliderChangeByChart = async (newSliderVal, chartId) => {
    const updatedPredictedDataSet = await predictData(newSliderVal, chartsData, predictedDataSet)
    setPredictedDataSet(updatedPredictedDataSet)
  }

  if (_.isEmpty(predictedDataSet)) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {chartsData.map((chartData, index) => {
        const predictedData = predictedDataSet[index]
        return (
          <div key={index}>
            <h3>Chart {index + 1}</h3>
            <SensitivityPlot
              chartId={index} // Passing chartId to the child component
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

async function predictData(newSliderVal, chartsData, predictedData) {
  return predictedData
}

SensitivityPlots.propTypes = {
  initialChartsData: PropTypes.arrayOf(
    PropTypes.shape({
      xmlPath: PropTypes.string.isRequired,
      sliderValue: PropTypes.number.isRequired,
      stepSize: PropTypes.number.isRequired,
    }),
  ).isRequired,
  initialPredictedDataSet: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        inputName: PropTypes.number.isRequired,
        predicted: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
}

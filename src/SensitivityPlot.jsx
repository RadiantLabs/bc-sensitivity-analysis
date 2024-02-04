import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import { format } from 'd3-format'
import Slider from '@mui/material/Slider'
import { useStore } from './useStore'
import isEmpty from 'lodash/isEmpty'
import { styled } from '@mui/material/styles'

const chartWidth = 700
const formatTick = format(',.2s') // SI notation: https://observablehq.com/@observablehq/plot-cheatsheets-scales

const SensitivityPlot = ({ chartData, predictedData, chartId }) => {
  const { sliderValues, setSliderValue, stepType } = useStore((state) => ({
    sliderValues: state.sliderValues,
    setSliderValue: state.setSliderValue,
    stepType: state.stepType,
  }))

  const chartRef = useRef()
  const sliderValue = sliderValues[chartId]

  const handleSliderChange = (event, newSliderVal) => {
    setSliderValue(chartId, newSliderVal)
  }

  useEffect(() => {
    const currentRef = chartRef.current
    if (!currentRef) {
      return undefined
    }

    // Clear the previous chart before appending a new one
    if (currentRef.firstChild) {
      currentRef.removeChild(currentRef.firstChild)
    }

    // Find the bar that the slider is under so we can highlight it
    const activeData = predictedData.find((d) => d.inputValue === sliderValue)

    // Initialize chart on mount
    const chart = Plot.plot({
      y: { axis: null },
      x: { axis: null },
      marks: [
        Plot.barY(predictedData, {
          x: 'inputValue',
          y: 'predicted',
          fill: (d) => (d.inputValue === sliderValue ? '#000' : '#dfdfdf'),
          stroke: '#bbb',
          strokeWidth: 0.5,
        }),
        ...(activeData
          ? [
              Plot.text([activeData], {
                x: 'inputValue',
                y: 'predicted',
                text: (d) => `${d.predicted}`,
                dy: -10,
                fill: 'black',
                textAlign: 'center',
                font: 'small-caption',
                fontWeight: 'bold',
              }),
            ]
          : []),
      ],
      height: 200,
      width: chartWidth,
      marginTop: 20,
    })

    // Append chart to chartRef div & define cleanup function to remove it on component unmount.
    currentRef.appendChild(chart)
    return () => {
      currentRef.removeChild(chart)
    }
  }, [predictedData, sliderValue]) // The chart will re-render only when these values change

  if (isEmpty(predictedData)) {
    return <div>Loading...</div>
  }

  const steps = chartData[stepType]
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '50px' }}>
        <div ref={chartRef} style={{ width: '100%', marginBottom: '-15px' }} />
        <CustomSlider
          value={sliderValue}
          onChange={handleSliderChange}
          marks={steps.map((step) => ({ value: step, label: formatTick(step) }))}
          max={Math.max(...steps)}
          min={Math.min(...steps)}
          step={null}
          valueLabelDisplay='auto'
          aria-label='Model Input Value'
          size='small'
          track={false}
          sx={getSliderStyles()}
        />
      </div>
    </div>
  )
}

SensitivityPlot.propTypes = {
  predictedData: PropTypes.arrayOf(
    PropTypes.shape({
      inputValue: PropTypes.number.isRequired,
      predicted: PropTypes.number.isRequired,
    })
  ),
  chartData: PropTypes.shape({
    xmlPath: PropTypes.string.isRequired,
    label: PropTypes.string,
    percentileSteps: PropTypes.arrayOf(PropTypes.number),
    evenSteps: PropTypes.arrayOf(PropTypes.number),
  }),
  chartId: PropTypes.string.isRequired,
}

export default SensitivityPlot

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
// Create a styled version of the Slider
const CustomSlider = styled(Slider)({
  '&.MuiSlider-root': {
    position: 'relative',
  },
  '&.MuiSlider-track': {
    height: 0,
  },
  '&.MuiSlider-rail': {
    // height: 0,
    color: 'gray',
  },
})

function getSliderStyles() {
  return {
    // position: 'absolute',
    // top: '93%', // Adjust this if necessary to position below the chart
    // left: '27px',
    // width: chartWidth - 54,
  }
}

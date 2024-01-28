import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { useStore } from './useStore'
import isEmpty from 'lodash/isEmpty'

const SensitivityPlot = ({ chartData, predictedData, chartId }) => {
  const { sliderValues, setSliderValue } = useStore((state) => ({
    sliderValues: state.sliderValues,
    setSliderValue: state.setSliderValue,
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
      y: {
        axis: null,
      },
      x: {
        axis: null,
      },
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
                text: (d) => `${d.predictedData}`,
                dy: -10,
                fill: 'black',
                textAlign: 'center',
                font: 'small-caption',
                fontWeight: 'bold',
              }),
            ]
          : []),
      ],
      height: 100,
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

  const marks = chartData.evenSteps
  return (
    <div style={{ position: 'relative' }}>
      <Box sx={{ width: '100%', padding: 2 }}>
        <div ref={chartRef} style={{ width: '100%' }} />
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          marks={marks.map((step) => ({ value: step, label: step.toString() }))}
          max={Math.max(...marks)}
          min={Math.min(...marks)}
          step={null}
          valueLabelDisplay='auto'
          aria-label='Model Input Value'
          size='small'
          track={false}
          style={getSliderStyles()}
          sx={getSliderStyles()}
        />
      </Box>
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
function getSliderStyles() {
  const sliderPadding = 38
  return {
    position: 'absolute',
    top: '77%', // Adjust this if necessary to position below the chart
    left: 0,
    right: 0,
    width: `calc(100% - ${sliderPadding * 2}px)`, // Adjust padding on both sides
    marginLeft: sliderPadding, // Apply half the padding value to align left side
    marginRight: sliderPadding, // Apply half the padding value to align right side
    // '& .MuiSlider-thumb': {  // https://mui.com/material-ui/customization/how-to-customize/
    //   borderRadius: '1px',
    // },
  }
}

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { useStore } from './useStore'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

const SensitivityPlot = ({ chartData, predictedData, chartId }) => {
  const { sliderValues, setSliderValue } = useStore((state) => ({
    sliderValues: state.sliderValues,
    setSliderValue: state.setSliderValue,
  }))

  // Retrieve the current slider value for this chart
  const sliderValue = sliderValues[chartId] || Math.min(map(predictedData, 'inputValue')) || 0

  const chartRef = useRef()

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
    currentRef.appendChild(chart)
    return () => {
      currentRef.removeChild(chart)
    }
  }, [predictedData, sliderValue]) // The chart will re-render when data or sliderValue changes

  if (isEmpty(predictedData)) {
    return <div>Loading...</div>
  }
  return (
    <div style={{ position: 'relative' }}>
      <Box sx={{ width: '100%', padding: 2 }}>
        <div ref={chartRef} style={{ width: '100%' }} />
        <Slider
          aria-label="Input Name"
          size="small"
          value={sliderValue}
          onChange={handleSliderChange}
          // step={1}
          // marks={predictedData.map((d) => ({ value: d.inputValue, label: d.inputValue.toString() }))}
          // min={Math.min(...predictedData.map((d) => d.inputValue))}
          // max={Math.max(...predictedData.map((d) => d.inputValue))}
          marks={chartData.evenSteps.map((step) => ({ value: step, label: step.toString() }))}
          step={null}
          valueLabelDisplay="off"
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
    }),
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

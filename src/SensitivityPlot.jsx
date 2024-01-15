import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

const SensitivityPlot = ({ chartData, predictedData }) => {
  // Assuming your data array is sorted, the initial value of the slider could be the first inputName.
  // If not sorted, you could find the minimum inputName value.
  const [sliderValue, setSliderValue] = useState(Math.min(...predictedData.map((d) => d.inputName)))
  const chartRef = useRef()

  useEffect(() => {
    const currentRef = chartRef.current
    console.log('sliderValue', sliderValue)

    // Clear the previous chart before appending a new one
    if (currentRef.firstChild) {
      currentRef.removeChild(currentRef.firstChild)
    }

    // Find the active data point
    const activeData = predictedData.find((d) => d.inputName === sliderValue)
    console.log('activeData', activeData)

    // Initialize chart on mount
    const chart = Plot.plot({
      y: {
        axis: null,
        grid: true,
      },
      x: {
        axis: null,
      },
      marks: [
        Plot.barY(predictedData, {
          x: 'inputName',
          y: 'predicted',
          fill: (d) => (d.inputName === sliderValue ? '#000' : '#dfdfdf'),
        }),
        ...(activeData
          ? [
              Plot.text([activeData], {
                x: 'inputName',
                y: 'predicted',
                text: (d) => d.predicted,
                dy: -10,
                fill: 'black',
                textAlign: 'center',
              }),
            ]
          : []),
      ],
      height: 100,
      marginTop: 30,
    })
    currentRef.appendChild(chart)
    return () => {
      currentRef.removeChild(chart)
    }
  }, [chartData, predictedData, sliderValue]) // The chart will re-render when data or sliderValue changes

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
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
          step={1}
          marks={predictedData.map((d) => ({ value: d.inputName, label: d.inputName.toString() }))}
          min={Math.min(...predictedData.map((d) => d.inputName))}
          max={Math.max(...predictedData.map((d) => d.inputName))}
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
      inputName: PropTypes.number.isRequired,
      predicted: PropTypes.number.isRequired,
    }),
  ),
  chartData: PropTypes.shape({
    xmlPath: PropTypes.string.isRequired,
    sliderValue: PropTypes.number.isRequired,
    stepSize: PropTypes.number.isRequired,
  }),
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

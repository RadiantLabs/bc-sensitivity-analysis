import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

const SensitivityPlot = ({ data }) => {
  // Assuming your data array is sorted, the initial value of the slider could be the first inputName.
  // If not sorted, you could find the minimum inputName value.
  const [sliderValue, setSliderValue] = useState(Math.min(...data.map((d) => d.inputName)))
  const chartRef = useRef()

  useEffect(() => {
    const currentRef = chartRef.current

    // Clear the previous chart before appending a new one
    if (currentRef.firstChild) {
      currentRef.removeChild(currentRef.firstChild)
    }

    // Find the active data point
    const activeData = data.find((d) => d.inputName === sliderValue)

    // Initialize the chart on mount
    const chart = Plot.plot({
      y: {
        axis: null,
        grid: true,
      },
      x: {
        axis: null,
      },
      marks: [
        Plot.barY(data, {
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
  }, [data, sliderValue]) // The chart will re-render when data or sliderValue changes

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
          marks={data.map((d) => ({ value: d.inputName, label: d.inputName.toString() }))}
          min={Math.min(...data.map((d) => d.inputName))}
          max={Math.max(...data.map((d) => d.inputName))}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      inputName: PropTypes.number.isRequired,
      predicted: PropTypes.number.isRequired,
    }),
  ).isRequired,
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

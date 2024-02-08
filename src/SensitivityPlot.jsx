import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as Plot from '@observablehq/plot'
import { CustomSlider } from './CustomSlider'
import { useStore } from './useStore'
import isEmpty from 'lodash/isEmpty'
import { inactiveColor, barStroke, chartConfig } from './utils/const'
import { calculateSlope } from './utils/calculateSlope'
import { formatSliderTickLabel } from './utils/formatSliderTickLabel'
import { getColorFromSlope } from './utils/getColorFromSlope'

const SensitivityPlot = ({ chartData, predictedData, chartId }) => {
  const { sliderValues, setSliderValue, stepType, yAxisDomain, chartLayout } = useStore((state) => ({
    sliderValues: state.sliderValues,
    setSliderValue: state.setSliderValue,
    stepType: state.stepType,
    yAxisDomain: state.yAxisDomain,
    chartLayout: state.chartLayout,
  }))

  const chartRef = useRef()
  const sliderValue = sliderValues[chartId]
  const slopes = calculateSlope(predictedData)
  const handleSliderChange = (event, newSliderVal) => setSliderValue(chartId, newSliderVal)

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

    const { chartWidth, chartHeight, barSlopeIndicatorHeight } = chartConfig[chartLayout]

    // Initialize chart on mount
    const chart = Plot.plot({
      y: {
        axis: null,
        domain: yAxisDomain,
      },
      x: { axis: null },
      marks: [
        // Add a small colored bar to the top of each bar to represent the slope
        Plot.barY(
          predictedData.map((d) => ({ ...d, predicted: d.predicted + barSlopeIndicatorHeight })), // Pick a value to make the bar taller
          {
            x: 'inputValue',
            y: 'predicted',
            fill: (d, i) => getColorFromSlope(slopes[i]), // Color based on slope
          }
        ),
        // Plot inactive bars
        Plot.barY(predictedData, {
          x: 'inputValue',
          y: 'predicted',
          // fill: (d) => (d.inputValue === sliderValue ? highlightColor : inactiveColor),
          fill: (d, i) => (d.inputValue === sliderValue ? getColorFromSlope(slopes[i]) : inactiveColor),
          stroke: barStroke,
          strokeWidth: 0.5,
        }),
        // Plot active bar
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
      height: chartHeight,
      width: chartWidth,
      marginTop: 20,
    })

    // Append chart to chartRef div & define cleanup function to remove it on component unmount.
    currentRef.appendChild(chart)
    return () => {
      currentRef.removeChild(chart)
    }
  }, [predictedData, sliderValue, slopes, yAxisDomain, chartLayout]) // The chart will re-render only when these values change

  if (isEmpty(predictedData)) {
    return <div>Loading...</div>
  }

  const steps = chartData[stepType]
  const maxSteps = Math.max(...steps)
  const minSteps = Math.min(...steps)
  const { displayPrecision } = chartData
  const showSliderLabels = chartLayout === 'single' // Only show labels on the single chart
  const marks = steps.map((step) => ({
    value: step,
    label: formatSliderTickLabel(step, displayPrecision, showSliderLabels),
  }))
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '50px' }}>
        <div ref={chartRef} style={{ width: '100%', marginBottom: '-15px' }} />
        <CustomSlider
          value={sliderValue}
          onChange={handleSliderChange}
          marks={marks}
          max={maxSteps}
          min={minSteps}
          step={null}
          valueLabelDisplay='auto'
          aria-label='Model Input Value'
          size='small'
          track={false}
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
    displayPrecision: PropTypes.number,
    percentileSteps: PropTypes.arrayOf(PropTypes.number),
    evenSteps: PropTypes.arrayOf(PropTypes.number),
  }),
  chartId: PropTypes.string.isRequired,
  yAxisDomain: PropTypes.arrayOf(PropTypes.number),
}

export default SensitivityPlot

import { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'
import { useStore } from '../useStore'
import { useTheme } from '@mui/material/styles'

const StdevBarChart = () => {
  const { chartDataSet } = useStore((state) => ({
    chartDataSet: state.chartDataSet,
  }))

  const chartRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    // Create a horizontal bar chart
    const chart = Plot.plot({
      x: {
        label: 'Standard Deviation',
        tickFormat: 's', // SI notation
        axis: 'top', // Move x-axis to the top
      },
      y: {
        domain: chartDataSet.map((d) => d.label),
        ticks: [],
        label: null,
        grid: true,
      },
      marks: [
        Plot.barX(chartDataSet, { x: 'stdev', y: 'label', fill: theme.palette.primary.mainChart }),
        Plot.text(chartDataSet, {
          x: 'stdev',
          y: 'label',
          text: (d) => d.label,
          dx: 5,
          textAnchor: 'start',
        }),
      ],
      marginRight: 120,
      width: 800,
      height: 800,
    })

    const currentRef = chartRef.current

    if (currentRef) {
      currentRef.appendChild(chart)
    }

    return () => {
      if (currentRef) {
        currentRef.removeChild(chart)
      }
    }
  }, [chartDataSet])

  return <div ref={chartRef} />
}

export default StdevBarChart

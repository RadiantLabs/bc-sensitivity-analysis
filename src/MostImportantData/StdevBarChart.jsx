import { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'
import { useStore } from '../useStore'

const StdevBarChart = () => {
  const { chartDataSet } = useStore((state) => ({
    chartDataSet: state.chartDataSet,
  }))

  const chartRef = useRef(null)

  useEffect(() => {
    // Create a horizontal bar chart
    const chart = Plot.plot({
      marginLeft: 200, // Adjust this value as needed for label space
      // grid: true,
      x: {
        label: 'Standard Deviation',
      },
      y: {
        label: null,
        domain: chartDataSet.map((d) => d.label),
        tickSize: 0,
      },
      marks: [Plot.barX(chartDataSet, { x: 'stdev', y: 'label' })],
      width: 600,
      height: 800,
      style: {
        marginLeft: '60px', // Adjust this value as needed
      },
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

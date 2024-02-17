import { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'

const BarChart = () => {
  const chartRef = useRef(null)

  // Sample data
  const data = [
    { label: 'Item 1', stdev: 25 },
    { label: 'Item 2', stdev: 30 },
    { label: 'Item 3', stdev: 22 },
    { label: 'Item 4', stdev: 18 },
    { label: 'Item 5', stdev: 29 },
    { label: 'Item 6', stdev: 15 },
    { label: 'Item 7', stdev: 10 },
    { label: 'Item 8', stdev: 5 },
    { label: 'Item 9', stdev: 32 },
    { label: 'Item 10', stdev: 7 },
    { label: 'Item 11', stdev: 45 },
    { label: 'Item 12', stdev: 20 },
    { label: 'Item 13', stdev: 15 },
    { label: 'Item 14', stdev: 28 },
    { label: 'Item 15', stdev: 33 },
    { label: 'Item 16', stdev: 19 },
    { label: 'Item 17', stdev: 8 },
    { label: 'Item 18', stdev: 13 },
    { label: 'Item 19', stdev: 38 },
    { label: 'Item 20', stdev: 23 },
  ].sort((a, b) => a.stdev - b.stdev)

  useEffect(() => {
    // Create a horizontal bar chart
    const chart = Plot.plot({
      x: {
        label: 'Standard Deviation',
      },
      y: {
        label: 'Label',
        domain: data.map((d) => d.label),
        reverse: true, // This will ensure the highest stdev is at the top
      },
      marks: [Plot.barX(data, { x: 'stdev', y: 'label' })],
      width: 600,
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
  }, [])

  return <div ref={chartRef} />
}

export default BarChart

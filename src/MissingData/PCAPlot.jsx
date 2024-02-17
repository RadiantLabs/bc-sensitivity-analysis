import { useRef, useEffect } from 'react'
import * as Plot from '@observablehq/plot'

const PCAPlot = () => {
  const chartRef = useRef()

  useEffect(() => {
    // Sample data generation for 10 principal components.
    const data = Array.from({ length: 10 }, (_, i) => ({
      component: `PC${i + 1}`,
      explainedVariance: parseFloat(Math.random().toFixed(3)),
    })).sort((a, b) => b.explainedVariance - a.explainedVariance) // Sort to mimic descending order of explained variance

    const cumulativeData = data.reduce((acc, currentValue) => {
      const lastCumulativeVariance = acc.length > 0 ? acc[acc.length - 1].cumulativeVariance : 0
      const newCumulativeVariance = lastCumulativeVariance + currentValue.explainedVariance
      return [...acc, { ...currentValue, cumulativeVariance: newCumulativeVariance }]
    }, [])

    // Create the chart.
    const chart = Plot.plot({
      grid: true,
      marginLeft: 40, // Adjust to ensure labels fit
      marginBottom: 30, // Adjust for legibility
      marks: [
        Plot.barY(data, { x: 'component', y: 'explainedVariance', fill: 'lightblue' }),
        Plot.line(cumulativeData, { x: 'component', y: 'cumulativeVariance', stroke: 'red' }),
        Plot.text(cumulativeData, {
          x: 'component',
          y: 'cumulativeVariance',
          text: (d) => d.cumulativeVariance.toFixed(3),
          dy: -4,
        }),
      ],
      style: {
        overflow: 'visible', // This will make sure the plot doesn't clip off text
        background: 'none', // Transparent background
        border: 'none', // No border
      },
    })

    // Append the chart to the ref'd container.
    if (chartRef.current) {
      chartRef.current.innerHTML = ''
      chartRef.current.appendChild(chart)
    }
  }, [])

  return <div ref={chartRef} />
}

export default PCAPlot

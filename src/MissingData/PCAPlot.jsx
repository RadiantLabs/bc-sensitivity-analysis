import { useRef, useEffect } from 'react'
import * as Plot from '@observablehq/plot'

// Sample data for 10 principal components.
const data = [
  { component: 'PC1', explainedVariance: 0.19 },
  { component: 'PC2', explainedVariance: 0.15 },
  { component: 'PC3', explainedVariance: 0.12 },
  { component: 'PC4', explainedVariance: 0.1 },
  { component: 'PC5', explainedVariance: 0.09 },
  { component: 'PC6', explainedVariance: 0.07 },
  { component: 'PC7', explainedVariance: 0.05 },
  { component: 'PC8', explainedVariance: 0.04 },
  { component: 'PC9', explainedVariance: 0.03 },
  { component: 'PC10', explainedVariance: 0.02 },
]

// Calculate cumulative variance
const cumulativeData = data.reduce((acc, currentValue) => {
  const lastCumulativeVariance = acc.length > 0 ? acc[acc.length - 1].cumulativeVariance : 0
  const newCumulativeVariance = lastCumulativeVariance + currentValue.explainedVariance
  return [...acc, { ...currentValue, cumulativeVariance: newCumulativeVariance }]
}, [])

const PCAPlot = () => {
  const chartRef = useRef()

  useEffect(() => {
    // Create the chart.
    const chart = Plot.plot({
      x: {
        label: 'Principal Component', // Set the label for the x-axis
        domain: data.map((d) => d.component), // Explicitly set the domain to match the component order
      },
      y: {
        label: 'Explained Variance Ratio', // Set the label for the y-axis
      },
      color: {
        legend: false, // Set to false if legend is not necessary
      },
      marks: [
        Plot.barY(data, {
          x: 'component',
          y: 'explainedVariance',
          fill: 'lightblue',
          title: (d) => `Explained Variance: ${d.explainedVariance}`, // Show the variance on hover
        }),
        Plot.line(cumulativeData, {
          x: 'component',
          y: 'cumulativeVariance',
          stroke: 'red',
          title: (d) => `Cumulative Variance: ${d.cumulativeVariance.toFixed(3)}`, // Show the cumulative variance on hover
        }),
        Plot.text(cumulativeData, {
          x: 'component',
          y: 'cumulativeVariance',
          text: (d) => d.cumulativeVariance.toFixed(3),
          fill: 'red',
          dy: -8, // Adjust the vertical position to avoid overlap
        }),
      ],
      style: {
        overflow: 'visible', // This will make sure the plot doesn't clip off text
        background: 'none', // Transparent background
        border: 'none', // No border
      },
      grid: true,
      marginLeft: 40, // Adjust to ensure labels fit
      marginBottom: 30, // Adjust for legibility
      width: 640, // Set width to match the original plot's aspect ratio
      height: 480, // Set height to match the original plot's aspect ratio
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

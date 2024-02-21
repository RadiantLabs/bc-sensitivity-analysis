import { useRef, useEffect } from 'react'
import * as Plot from '@observablehq/plot'
import { useTheme } from '@mui/material/styles'

// Provided static data for the first 10 principal components.
const data = [
  { component: 'PC1', explainedVariance: 0.19, label: 'Conditioned Area' },
  { component: 'PC2', explainedVariance: 0.15, label: 'Attic Insulation' },
  { component: 'PC3', explainedVariance: 0.12, label: 'Building Component 3' },
  { component: 'PC4', explainedVariance: 0.1, label: 'Building Component 4' },
  { component: 'PC5', explainedVariance: 0.09, label: 'Building Component 5' },
  { component: 'PC6', explainedVariance: 0.07, label: 'Building Component 6' },
  { component: 'PC7', explainedVariance: 0.05, label: 'Building Component 7' },
  { component: 'PC8', explainedVariance: 0.04, label: 'Building Component 8' },
  { component: 'PC9', explainedVariance: 0.03, label: 'Building Component 9' },
  { component: 'PC10', explainedVariance: 0.02, label: 'Building Component 10' },
]

// Calculate cumulative variance
const cumulativeData = data.reduce((acc, currentValue) => {
  const lastCumulativeVariance = acc.length > 0 ? acc[acc.length - 1].cumulativeVariance : 0
  const newCumulativeVariance = lastCumulativeVariance + currentValue.explainedVariance
  return [...acc, { ...currentValue, cumulativeVariance: newCumulativeVariance }]
}, [])

const PCAPlot = () => {
  const chartRef = useRef()
  const theme = useTheme()
  const { palette } = theme

  useEffect(() => {
    const chart = Plot.plot({
      x: {
        label: 'Principal Component', // Set the label for the x-axis
        domain: data.map((d) => d.component), // Explicitly set the domain to match the component order
      },
      y: {
        label: 'Explained Variance Ratio (%)', // Set the label for the y-axis and indicate it's a percentage
        tickFormat: (d) => `${d}%`, // Format the ticks as percentages without multiplying by 100
      },
      marks: [
        Plot.barY(data, {
          x: 'component',
          y: (d) => d.explainedVariance * 100, // Convert to percentage
          fill: palette.primary.light,
          title: (d) => `${d.label}: ${(d.explainedVariance * 100).toFixed(0)}%`, // Show the label and variance as a percentage on hover
        }),
        Plot.line(cumulativeData, {
          x: 'component',
          y: (d) => d.cumulativeVariance * 100, // Convert to percentage
          stroke: palette.secondary.light,
        }),
        Plot.text(cumulativeData, {
          x: 'component',
          y: (d) => d.cumulativeVariance * 100, // Convert to percentage
          text: (d) => `${d.label}: ${Math.round(d.cumulativeVariance * 100)}%`, // Text labels with percentages
          // fill: palette.text.primary, // Doesn't work. Need to set in CSS (index.css)
          fontSize: '0.8rem',
          dy: 0, // Set the vertical position to align with the dot
          dx: 10, // Set a small horizontal offset to the right of the dot
          textAnchor: 'start', // Aligns the text to the start (right side) of the dot
        }),
        Plot.dot(cumulativeData, {
          x: 'component',
          y: (d) => d.cumulativeVariance * 100,
          fill: palette.secondary.light,
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
      width: 980, // Adjust width as needed
      height: 600, // Set height to match the original plot's aspect ratio
    })

    // Append the chart to the ref'd container.
    if (chartRef.current) {
      chartRef.current.innerHTML = ''
      chartRef.current.appendChild(chart)
    }
  }, [palette])

  return <div ref={chartRef} />
}

export default PCAPlot

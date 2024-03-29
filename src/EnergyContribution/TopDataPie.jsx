import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useTheme } from '@mui/material/styles'

const data = [
  { category: 'topData', count: 40, label: 'Top 10 Data Points' },
  { category: 'allData', count: 548, label: 'All Data' },
]

function TopDataPie() {
  const ref = useRef()
  const theme = useTheme()
  const { fontFamily } = theme.typography
  const { palette } = theme
  const fixedWidth = 150 // Fixed width for the SVG
  const height = 200 // Fixed height for the SVG
  const radius = Math.min(fixedWidth, height) / 2 // Radius for the pie chart

  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', fixedWidth).attr('height', height)
    svg.selectAll('*').remove() // Clear child nodes from svg
    const g = svg.append('g').attr('transform', `translate(${fixedWidth / 2}, ${height / 2})`) // SVG group to append to

    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null)

    const arc = d3.arc().outerRadius(radius).innerRadius(0)

    // Calculate the line start point inside the segment
    const lineArc = d3
      .arc()
      .outerRadius(radius + 30) // Start line slightly inside the outer edge of the pie segment
      .innerRadius(0)

    // Calculate the label position
    const labelArc = d3
      .arc()
      .outerRadius(radius + 20) // Position for the label
      .innerRadius(radius + 20)

    const arcs = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => {
        return i === 0
          ? palette.secondary.light // Set the color for the topData (small) segment
          : palette.primary.light // Set the color for the allData (large) segment
      })

    // Line segment going from the pie segment to the label
    arcs
      .filter((d) => d.data.category === 'topData')
      .append('line')
      .attr('x1', (d) => lineArc.centroid(d)[0])
      .attr('y1', (d) => lineArc.centroid(d)[1])
      .attr('x2', (d) => labelArc.centroid(d)[0] * 0.9) // End line before it reaches the label
      .attr('y2', (d) => labelArc.centroid(d)[1] * 0.9)
      .attr('stroke', palette.primary.main)
      .attr('stroke-width', 1)

    // Label attached to line segment
    arcs
      .filter((d) => d.data.category === 'topData')
      .append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)[0]}, ${labelArc.centroid(d)[1]})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', palette.primary.main)
      .attr('font-size', '10px') // Font size for the label
      .attr('font-family', fontFamily)
      .text((d) => d.data.label)
  }, [radius, palette, fontFamily])

  return <svg ref={ref}></svg>
}

export default TopDataPie

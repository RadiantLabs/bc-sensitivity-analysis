import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChartWithCallout = () => {
  const ref = useRef()

  useEffect(() => {
    const data = [
      { category: 'Inputs Used', value: 564 },
      { category: 'Inputs Needed', value: 20 },
    ]

    // Ensure that the 'Inputs Needed' segment starts at the top
    data.sort((a, b) => a.value - b.value)

    const width = 300
    const height = 300
    const radius = Math.min(width, height) / 2

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const color = d3.scaleOrdinal(['#377eb8', '#4daf4a'])

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null) // Disable default sorting
      .startAngle(-Math.PI / 2) // Start at top
      .endAngle(Math.PI * 1.5) // End at top

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0)

    const labelArc = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40)

    const arc = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc')

    arc
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => color(d.data.category))

    // Calculate the angle for positioning the labels
    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2

    // Adding polyline for annotations
    arc
      .append('polyline')
      .attr('points', (d) => {
        const posA = path.centroid(d) // Line start at slice
        const posB = labelArc.centroid(d) // Pull line outwards
        const posC = labelArc.centroid(d) // Where the text is placed
        posC[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) // Adjust text position
        return [posA, posB, posC]
      })
      .style('fill', 'none')
      .style('stroke', (d) => (d.data.category === 'Inputs Needed' ? 'black' : 'none')) // Only show for 'Inputs Needed'
      .style('stroke-width', 1)

    // Adding labels
    arc
      .append('text')
      .attr('transform', (d) => {
        const pos = labelArc.centroid(d)
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
        return `translate(${pos})`
      })
      .attr('dy', '.35em') // Center vertically
      .attr('dx', (d) => (midAngle(d) < Math.PI ? '-1em' : '1em')) // Offset horizontally
      .style('text-anchor', (d) => (midAngle(d) < Math.PI ? 'end' : 'start'))
      .text((d) => (d.data.category === 'Inputs Needed' ? '20 inputs needed for 85% accuracy' : ''))
      .style('font-size', '10px')
  }, [])

  return <svg ref={ref}></svg>
}

export default PieChartWithCallout

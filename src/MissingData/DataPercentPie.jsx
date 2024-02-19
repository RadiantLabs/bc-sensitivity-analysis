import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const data = [
  { category: 'allData', value: 548 },
  { category: 'topData', value: 40 },
]

const PieChartWithLabels = () => {
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.selectAll('*').remove() // Clear svg content before adding new elements

    const width = 450
    const height = 450
    const radius = Math.min(width, height) / 2

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const pie = d3.pie().value((d) => d.value)
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0)
    const outerArc = d3
      .arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9)

    svgElement.attr('width', width).attr('height', height)

    const g = svgElement.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

    g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.category))

    const textLines = g
      .selectAll('polyline')
      .data(pie(data))
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d) => {
        const posA = arc.centroid(d)
        const posB = outerArc.centroid(d)
        const posC = outerArc.centroid(d)
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1)
        return [posA, posB, posC]
      })

    g.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d) => d.data.category)
      .attr('transform', (d) => {
        const pos = outerArc.centroid(d)
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1)
        return `translate(${pos})`
      })
      .style('text-anchor', (d) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return midangle < Math.PI ? 'start' : 'end'
      })
  }, [data])

  return <svg ref={ref}></svg>
}

export default PieChartWithLabels

// Example usage:
// <PieChartWithLabels data={[{ category: 'food', value: 29 }, { category: 'outdoor activities', value: 71 }]} />

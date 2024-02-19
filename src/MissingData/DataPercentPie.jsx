import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

function PieChartWithLabels() {
  const ref = useRef()
  const containerRef = useRef()
  const [size, setSize] = useState({ width: 0, height: 400 })

  // Adjusted data order so that 'topData' comes first
  const data = [
    { category: 'topData', value: 40, label: 'Top Data' },
    { category: 'allData', value: 548, label: 'All Data' },
  ]

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth * 0.7, // 70% of container width
          height: 400,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (size.width === 0) return

    const width = size.width
    const height = size.height
    const radius = Math.min(width, height) / 2 - 40 // Reduced radius to provide margin

    const svg = d3.select(ref.current).attr('width', width).attr('height', height)

    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null) // Disable sorting to maintain data order

    const arc = d3.arc().outerRadius(radius).innerRadius(0)
    const labelArc = d3
      .arc()
      .outerRadius(radius + 30)
      .innerRadius(radius + 30) // Adjusted for label

    const arcs = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => (i === 0 ? '#8a89a6' : '#98abc5')) // Adjusted color order

    arcs
      .filter((d) => d.data.category === 'topData')
      .append('line')
      .attr('x1', (d) => arc.centroid(d)[0])
      .attr('y1', (d) => arc.centroid(d)[1])
      .attr('x2', (d) => labelArc.centroid(d)[0])
      .attr('y2', (d) => labelArc.centroid(d)[1])
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    arcs
      .filter((d) => d.data.category === 'topData')
      .append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)[0]}, ${labelArc.centroid(d)[1]})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'darkslategray')
      .text((d) => d.data.label)
  }, [size])

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={ref}></svg>
    </div>
  )
}

export default PieChartWithLabels

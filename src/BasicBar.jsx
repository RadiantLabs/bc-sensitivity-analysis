import * as Plot from '@observablehq/plot'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function BasicBar() {
  const ref = useRef()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const barChart = Plot.plot({
      marks: [
        Plot.barY(data, {
          x: 'input value',
          y: 'Energy (MMBTU)',
          sort: {
            x: 'y',
          },
        }),
        Plot.ruleY([0]),
      ],
      y: {
        grid: true,
      },
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50,
    })
    ref.current.append(barChart)
    return () => barChart.remove()
  })

  return (
    <>
      <div ref={ref} />
    </>
  )
}

export default BasicBar

// --------------------------------------------------
// --------------------------------------------------
const data = [
  { 'input value': 'a', 'Energy (MMBTU)': 0.08167 },
  { 'input value': 'b', 'Energy (MMBTU)': 0.01492 },
  { 'input value': 'c', 'Energy (MMBTU)': 0.02782 },
  { 'input value': 'd', 'Energy (MMBTU)': 0.04253 },
  { 'input value': 'e', 'Energy (MMBTU)': 0.12702 },
  { 'input value': 'f', 'Energy (MMBTU)': 0.02228 },
  { 'input value': 'g', 'Energy (MMBTU)': 0.02015 },
  { 'input value': 'h', 'Energy (MMBTU)': 0.06094 },
  { 'input value': 'i', 'Energy (MMBTU)': 0.06966 },
  { 'input value': 'j', 'Energy (MMBTU)': 0.00153 },
  { 'input value': 'k', 'Energy (MMBTU)': 0.00772 },
  { 'input value': 'l', 'Energy (MMBTU)': 0.04025 },
  { 'input value': 'm', 'Energy (MMBTU)': 0.02406 },
  { 'input value': 'n', 'Energy (MMBTU)': 0.06749 },
  { 'input value': 'o', 'Energy (MMBTU)': 0.07507 },
  { 'input value': 'p', 'Energy (MMBTU)': 0.01929 },
  { 'input value': 'q', 'Energy (MMBTU)': 0.00095 },
  { 'input value': 'r', 'Energy (MMBTU)': 0.05987 },
  { 'input value': 's', 'Energy (MMBTU)': 0.06327 },
  { 'input value': 't', 'Energy (MMBTU)': 0.09056 },
  { 'input value': 'u', 'Energy (MMBTU)': 0.02758 },
  { 'input value': 'v', 'Energy (MMBTU)': 0.00978 },
  { 'input value': 'w', 'Energy (MMBTU)': 0.0236 },
  { 'input value': 'x', 'Energy (MMBTU)': 0.0015 },
  { 'input value': 'y', 'Energy (MMBTU)': 0.01974 },
  { 'input value': 'z', 'Energy (MMBTU)': 0.00074 },
]

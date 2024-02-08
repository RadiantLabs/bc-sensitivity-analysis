export function getColorFromSlope(slope) {
  const intensity = Math.min(1, Math.abs(slope) * 2) // Control intensity
  const reductionFactor = 255 * (1 - intensity)
  if (slope > 0) {
    // Positive slope: transition from grey to dark red
    const red = 255
    const green = reductionFactor
    const blue = reductionFactor
    return `rgba(${red}, ${green}, ${blue}, 1)`
  } else {
    // Negative slope: transition from grey to dark blue
    const blue = 255
    const red = reductionFactor
    const green = reductionFactor
    return `rgba(${red}, ${green}, ${blue}, 1)`
  }
}

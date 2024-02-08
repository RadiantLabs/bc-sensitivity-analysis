export function getColorFromSlope(slope) {
  const intensity = Math.min(1, Math.abs(slope) * 2) // Control intensity
  if (slope > 0) {
    // Positive slope: shades of red
    return `rgba(255, ${255 - intensity * 255}, ${255 - intensity * 255}, ${intensity})`
  } else {
    // Negative slope: shades of blue
    return `rgba(${255 - intensity * 255}, ${255 - intensity * 255}, 255, ${intensity})`
  }
}

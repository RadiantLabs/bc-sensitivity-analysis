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

// export function getColorFromSlope(slope) {
//   const intensity = Math.min(1, Math.abs(slope) * 2) // Control intensity

//   let red, green, blue

//   if (slope > 0) {
//     // Positive slope: transition from grey to dark red
//     red = 255
//     green = blue = 255 * (1 - intensity)
//   } else {
//     // Negative slope: transition from grey to dark blue
//     blue = 255
//     red = green = 255 * (1 - intensity)
//   }

//   return `rgba(${red}, ${green}, ${blue}, 1)`
// }

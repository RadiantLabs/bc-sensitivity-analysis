import { format } from 'd3-format'

// Format the number of significant digits of the ticks on the slider
export function formatSliderTickLabel(value, displayPrecision, showSliderLabels) {
  if (!showSliderLabels) {
    return null
  }
  return displayPrecision
    ? format(`.${displayPrecision}s`)(value) // D3 SI notation: https://observablehq.com/@observablehq/plot-cheatsheets-scales
    : Math.round(value)
}

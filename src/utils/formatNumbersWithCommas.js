import * as d3 from 'd3'

export function formatNumbersWithCommas(number) {
  return d3.format(',')(number)
}

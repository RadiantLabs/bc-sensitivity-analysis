/* Output should look like:
sliderValues = {
  xmlPath1: 1647
  xmlPath2: 1510
  xmlPath3: 95
}
*/
// Return the middle value in each evenSteps array
export function getInitialSliderValues(chartData, stepType) {
  return chartData.reduce((acc, item) => {
    const stepArray = item[stepType]
    const value = stepArray[Math.floor(item[stepType].length / 2)]
    acc[item.xmlPath] = value
    return acc
  }, {})
}

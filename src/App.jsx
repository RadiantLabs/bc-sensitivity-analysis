import Inference from './Inference'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import './App.css'

// import { sortedXmlPaths } from './assets/sortedXmlPaths.js'
// import { topRanked } from './assets/topRanked.js'
// import { topRankedActionable } from './assets/topRankedActionable.js'

import { chartData } from './assets/chartData.js'
// import { chartDataActionable } from './assets/chartDataActionable.js'
console.log('chartData', chartData)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SensitivityPlots chartData={chartData} initialPredictedDataSet={initialPredictedDataSet} />
      <Inference />
    </ThemeProvider>
  )
}

export default App

const predictedData = [
  { inputValue: 0, predicted: 5900 },
  { inputValue: 1, predicted: 6000 },
  { inputValue: 2, predicted: 6100 },
  { inputValue: 3, predicted: 6200 },
  { inputValue: 4, predicted: 6300 },
  { inputValue: 5, predicted: 6400 },
  { inputValue: 6, predicted: 6500 },
  { inputValue: 7, predicted: 6600 },
  { inputValue: 8, predicted: 6700 },
  { inputValue: 9, predicted: 6800 },
  { inputValue: 10, predicted: 6900 },
  { inputValue: 11, predicted: 7000 },
  { inputValue: 12, predicted: 7100 },
  { inputValue: 13, predicted: 7200 },
  { inputValue: 14, predicted: 7300 },
  { inputValue: 15, predicted: 7400 },
  { inputValue: 16, predicted: 7500 },
  { inputValue: 17, predicted: 7600 },
  { inputValue: 18, predicted: 7700 },
]

const initialPredictedDataSet = [predictedData, predictedData, predictedData]

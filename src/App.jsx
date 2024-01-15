import Inference from './Inference'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import './App.css'

// import { sortedXmlPaths } from './assets/sortedXmlPaths.js'
// import { topRanked } from './assets/topRanked.js'
// import { topRankedActionable } from './assets/topRankedActionable.js'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SensitivityPlots initialChartsData={initialChartsData} initialPredictedDataSet={initialPredictedDataSet} />
      <Inference />
    </ThemeProvider>
  )
}

export default App

const predictedData = [
  { inputName: 0, predicted: 5900 },
  { inputName: 1, predicted: 6000 },
  { inputName: 2, predicted: 6100 },
  { inputName: 3, predicted: 6200 },
  { inputName: 4, predicted: 6300 },
  { inputName: 5, predicted: 6400 },
  { inputName: 6, predicted: 6500 },
  { inputName: 7, predicted: 6600 },
  { inputName: 8, predicted: 6700 },
  { inputName: 9, predicted: 6800 },
  { inputName: 10, predicted: 6900 },
  { inputName: 11, predicted: 7000 },
  { inputName: 12, predicted: 7100 },
  { inputName: 13, predicted: 7200 },
  { inputName: 14, predicted: 7300 },
  { inputName: 15, predicted: 7400 },
  { inputName: 16, predicted: 7500 },
  { inputName: 17, predicted: 7600 },
  { inputName: 18, predicted: 7700 },
]

const initialPredictedDataSet = [predictedData, predictedData, predictedData]

const initialChartsData = [
  {
    xmlPath: 'ABC',
    sliderValue: 0,
    stepSize: 1,
  },
  {
    xmlPath: 'DEF',
    sliderValue: 3,
    stepSize: 1,
  },
]

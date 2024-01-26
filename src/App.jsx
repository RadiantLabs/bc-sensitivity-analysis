import Inference from './Inference'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SensitivityPlots />
      <Inference />
    </ThemeProvider>
  )
}

export default App

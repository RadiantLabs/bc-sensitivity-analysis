import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SensitivityPlots />
    </ThemeProvider>
  )
}

export default App

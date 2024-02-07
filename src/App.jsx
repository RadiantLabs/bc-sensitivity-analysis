import React, { useState } from 'react'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { theme } from './theme'
import './App.css'

const App = () => {
  const [weatherFile, setWeatherFile] = useState('file1')
  const [layout, setLayout] = useState('layout1')
  const [mode, setActionable] = useState('actionable')

  const handleActionableChange = (event, newActionable) => {
    if (newActionable !== null) {
      setActionable(newActionable)
    }
  }
  const handleWeatherChange = (event, newWeather) => {
    if (newWeather !== null) {
      setWeatherFile(newWeather)
    }
  }

  const handleLayoutChange = (event, newLayout) => {
    if (newLayout !== null) {
      setLayout(newLayout)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h2'>Page Title</Typography>
          <Typography variant='subtitle1'>This is a smaller description underneath the title.</Typography>
        </Grid>

        <Grid container item xs={9}>
          <SensitivityPlots />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1' align='left' mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          {/* Define a consistent width for all ToggleButtonGroups */}
          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption' align='left'>
              Weather File
            </Typography>
            <ToggleButtonGroup fullWidth size='small' value={weatherFile} exclusive onChange={handleWeatherChange} style={{ width: '100%' }}>
              <ToggleButton value='file1' sx={ToggleButtonStyles}>
                Santa Rosa, CA
              </ToggleButton>
              <ToggleButton value='file2' sx={ToggleButtonStyles}>
                Hudson, NY
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption' align='left'>
              Column Layout
            </Typography>
            <ToggleButtonGroup fullWidth size='small' value={layout} exclusive onChange={handleLayoutChange} style={{ width: '100%' }}>
              <ToggleButton value='layout1' sx={ToggleButtonStyles}>
                1
              </ToggleButton>
              <ToggleButton value='layout2' sx={ToggleButtonStyles}>
                2
              </ToggleButton>
              <ToggleButton value='layout3' sx={ToggleButtonStyles}>
                3
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption' align='left'>
              Upgradability
            </Typography>
            <ToggleButtonGroup fullWidth size='small' value={mode} exclusive onChange={handleActionableChange} style={{ width: '100%' }}>
              <ToggleButton value='actionable' sx={ToggleButtonStyles}>
                Actionable
              </ToggleButton>
              <ToggleButton value='mixed' sx={ToggleButtonStyles}>
                Mixed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
const ToggleButtonStyles = {
  padding: '6px 10px',
  fontSize: '0.7rem',
}

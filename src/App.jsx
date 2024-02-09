import { useState } from 'react'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useStore } from './useStore'
import { theme } from './theme'
import './App.css'

const App = () => {
  const [weatherFile, setWeatherFile] = useState('file1') // TODO: convert to Zustand

  const { chartLayout, setChartLayout, chartDataSetType, setChartDataSetType } = useStore((state) => ({
    chartDataSetType: state.chartDataSetType,
    setChartDataSetType: state.setChartDataSetType,
    chartLayout: state.chartLayout,
    setChartLayout: state.setChartLayout,
  }))

  const handleChartDataSetTypeChange = (event, newChartDataSetType) => {
    if (newChartDataSetType !== null) {
      setChartDataSetType(newChartDataSetType)
    }
  }

  const handleChartLayoutChange = (event, newChartLayout) => {
    if (newChartLayout !== null) {
      setChartLayout(newChartLayout)
    }
  }

  const handleWeatherChange = (event, newWeather) => {
    if (newWeather !== null) {
      setWeatherFile(newWeather)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>How a Building Loses Energy</Typography>
          <Typography variant='subtitle1' align='left'>
            How sensitive is a building&rsquo;s energy use to different characteristics of the building? The charts
            below shows the typical annual electricity consumption based on variations of the building characteristics.
            This is sorted by the most impactful at the top and that drops as you go down. There are over 500 inputs to
            this calculation so this is a sample of the most important.
            <br />
            Try moving the sliders on the charts left and right
          </Typography>
        </Grid>

        <Grid container item xs={9}>
          <SensitivityPlots />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1' align='left' mb={2}>
            Notice the slope of the curve the bars make. If the slope is up and to the right, if you increase the value
            of that building characteristic, you will increase a building&rsquo;s energy use. If it goes down, you
            decrease.
          </Typography>

          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption' align='left'>
              <strong>Upgradability:</strong> Show only building attributes that you can typically change
            </Typography>
            <ToggleButtonGroup
              fullWidth
              size='small'
              value={chartDataSetType}
              exclusive
              onChange={handleChartDataSetTypeChange}
              style={{ width: '100%' }}
            >
              <ToggleButton value='mixed' sx={ToggleButtonStyles}>
                Mixed
              </ToggleButton>
              <ToggleButton value='actionable' sx={ToggleButtonStyles}>
                Actionable
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption' align='left'>
              <strong>Weather</strong>
            </Typography>
            <ToggleButtonGroup
              fullWidth
              size='small'
              value={weatherFile}
              exclusive
              onChange={handleWeatherChange}
              style={{ width: '100%' }}
            >
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
              <strong>Column Layout</strong>
            </Typography>
            <ToggleButtonGroup
              fullWidth
              size='small'
              value={chartLayout}
              exclusive
              onChange={handleChartLayoutChange}
              style={{ width: '100%' }}
            >
              <ToggleButton value='single' sx={ToggleButtonStyles}>
                1
              </ToggleButton>
              <ToggleButton value='double' sx={ToggleButtonStyles}>
                2
              </ToggleButton>
              <ToggleButton value='triple' sx={ToggleButtonStyles}>
                3
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

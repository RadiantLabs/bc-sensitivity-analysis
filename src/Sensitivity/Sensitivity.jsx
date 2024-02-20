import { useState } from 'react'
import SensitivityPlots from '../Sensitivity/SensitivityPlots'
import Grid from '@mui/material/Grid'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useStore } from '../useStore'
import { ToggleButtonStyles } from '../utils/ToggleButtonStyles'

const Sensitivity = () => {
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

  //

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} marginTop={2} align='left'>
        <Typography variant='body'>
          How sensitive is a building&rsquo;s energy use to different characteristics of the building? The charts below
          shows the typical annual electricity consumption based on variations of the building characteristics. This is
          sorted by the most impactful at the top and that drops as you go down. There are over 500 inputs to this
          calculation so this is a sample of the most important. Try moving the sliders on the charts left and right.
        </Typography>
      </Grid>
      <Grid container item xs={8}>
        <SensitivityPlots />
      </Grid>

      <Grid item xs={4} align='left'>
        <Box
          height={40}
          width={80}
          display='flex'
          alignItems='center'
          color={'text.primary'}
          border={1}
          borderRadius={1}
        >
          XOXO
        </Box>

        <Typography variant='caption' marginBottom={2}>
          Notice the slope of the curve the bars make. If the slope is up and to the right, if you increase the value of
          that building characteristic, you will increase a building&rsquo;s energy use. If it goes down, you decrease.
        </Typography>

        <Box marginBottom={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>
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

        <Box marginBottom={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>
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

        <Box marginBottom={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>
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
  )
}

export default Sensitivity

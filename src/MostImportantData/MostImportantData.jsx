import Grid from '@mui/material/Grid'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import StdevBarChart from './StdevBarChart'
import { useStore } from '../useStore'
import { ToggleButtonStyles } from '../utils/ToggleButtonStyles'

const MostImportantData = () => {
  const { chartDataSetType, setChartDataSetType } = useStore((state) => ({
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

  return (
    <Grid container spacing={2} align='left'>
      <Grid item xs={8} marginTop={2}>
        <StdevBarChart />
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2' marginTop={6}>
          Let&rsquo;s consider which data is most important to get right. Notice that most of these relate to surface
          areas and perimeters.
        </Typography>
        <Box marginTop={2} sx={{ display: 'flex', flexDirection: 'column' }}>
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
      </Grid>
    </Grid>
  )
}

export default MostImportantData

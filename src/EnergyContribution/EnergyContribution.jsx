import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import PCAPlot from './PCAPlot'
import TopDataPie from './TopDataPie'

const MissingData = () => {
  return (
    <Grid container spacing={2} align='left'>
      <Grid container item xs={12} marginTop={2}>
        <Typography variant='h5'>The more building data we have, the better we can predict energy use.</Typography>
        <Typography variant='body'>
          But at any scale that matters to business or the climate, we will be missing the majority of the building
          data. The analysis below shows that we can still get an accurate model without measuring every inch of the
          house.{' '}
          <em>
            Note: this does not include utility bills. We will cover that in &ldquo;Calibrated vs. Uncalibrated&rdquo;.
          </em>
        </Typography>
      </Grid>
      <Grid item xs={10} marginTop={2}>
        <Box>
          <PCAPlot />
        </Box>
      </Grid>
      <Grid item xs={2} marginTop={10}>
        <Typography variant='caption' sx={{ display: 'inline-block', lineHeight: '1.6' }}>
          Out of 548 data points to run an energy model, it takes only 40 to explain 86% of the energy consumption.
        </Typography>
        <Box marginTop={2}>
          <TopDataPie />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MissingData

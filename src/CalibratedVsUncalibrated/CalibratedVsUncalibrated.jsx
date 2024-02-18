import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'

const CalibratedVsUncalibrated = () => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} marginTop={2}>
        <Typography variant='h5' align='left'>
          Calibrated vs Uncalibrated
        </Typography>
        <Typography variant='body2' align='left'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Grid>
      <Grid container item xs={12} marginTop={2}>
        <Box></Box>
      </Grid>
    </Grid>
  )
}

export default CalibratedVsUncalibrated

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------

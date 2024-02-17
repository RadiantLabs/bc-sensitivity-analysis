// import { useState } from 'react'
// import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import PCAPlot from './PCAPlot'
// import { useStore } from '../useStore'

const MissingData = () => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} marginTop={2}>
        <Typography variant='subtitle1' align='left'>
          How do you handle missing data?
        </Typography>
      </Grid>
      <Grid container item xs={12} marginTop={2}>
        <Box>
          <PCAPlot />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MissingData

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
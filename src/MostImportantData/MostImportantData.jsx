import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import StdevBarChart from './StdevBarChart'

const MostImportantData = () => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} marginTop={2}>
        <Typography variant='subtitle1' align='left'>
          What is the most important data?
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Box>
          <StdevBarChart />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MostImportantData

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------

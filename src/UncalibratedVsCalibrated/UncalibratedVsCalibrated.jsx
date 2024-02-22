import Grid from '@mui/material/Grid'
import { Card, CardMedia, Typography, List, ListItem } from '@mui/material'
import { orderedListStyles } from '../utils/const'

const CalibratedVsUncalibrated = () => {
  return (
    <Grid container spacing={2} align='left'>
      <Grid item xs={12} marginTop={2}>
        <Typography variant='h6'>Uncalibrated vs. Calibrated Accuracy</Typography>
        <Typography variant='body2' marginBottom={1}>
          The energy consumption of a house is primarily a function of three things:
        </Typography>
        <List variant='body2' disablePadding sx={orderedListStyles}>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            Building characteristics
          </ListItem>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            Occupant behavior
          </ListItem>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            Weather
          </ListItem>
        </List>
        <Typography variant='body2' marginTop={1}>
          Weather is easy to know. Getting the building characteristics and occupant behavior is harder. However, we can
          infer them from knowing how the occupant has used equipment in the building. This is called calibration. Shown
          are results of our first pass at calibration and how it has affected accuracy of our models.
        </Typography>
      </Grid>
      <Grid container item xs={12} marginTop={2}>
        <Card>
          <CardMedia
            component='img'
            height='540'
            image='src/assets/calibration box plots.png'
            alt='Calibration Improvement'
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default CalibratedVsUncalibrated

import React from 'react'
import PropTypes from 'prop-types'
import Sensitivity from '../Sensitivity/Sensitivity'
import EnergyContribution from '../EnergyContribution/EnergyContribution'
import MostImportantData from '../MostImportantData/MostImportantData'
import CalibratedVsUncalibrated from '../CalibratedVsUncalibrated/CalibratedVsUncalibrated'
import Grid from '@mui/material/Grid'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { useStore } from '../useStore'
import { styled } from '@mui/material/styles'
import './App.css'

const tabLabels = [
  { title: 'Contribution to Energy Use', value: 'energyContribution' },
  { title: "What's the Most Important Data?", value: 'mostImportantData' },
  { title: 'Sensitivity to Building Changes', value: 'sensitivity' },
  { title: 'Calibrated vs. Uncalibrated', value: 'calibrated' },
]

const App = () => {
  const { currentTab, setCurrentTab } = useStore()

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab)
  }

  return (
    <Grid container padding={4}>
      <Grid xs={12} item marginBottom={4}>
        <Typography variant='h5'>How a Building Uses & Loses Energy</Typography>
        <Typography variant='body2' align='left'>
          Accurate building energy and financial modeling can no longer be a niche skill practiced by a few energy
          nerds. Pressure from a couple directions is making this need existential:
        </Typography>
        <ol>
          <li>
            <Typography variant='body2' align='left' sx={{ fontStyle: 'italic' }}>
              The climate crisis is forcing us to rip fossil fuels out of our buildings as quickly as we can. We need to
              be doing this at a rate of about 10 million homes per year to make a real impact.
            </Typography>
          </li>
          <li>
            <Typography variant='body2' align='left' sx={{ fontStyle: 'italic' }}>
              The current and impending loss of solar net metering across the country makes the solar value proposition
              (which is necessary for cost effective decarbonization) more difficult. Without great solar economics,
              thousands of solar jobs are at risk.
            </Typography>
          </li>
        </ol>
        <Typography variant='body2' align='left'>
          Accurate modeling that incorporates the whole picture: building shell, HVAC, solar, vehicle, batteries and
          financials is the only way to find the profitable upgrades at the scale we need to save the solar industry and
          get the carbon reductions we need.
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='analysis tabs'
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            {tabLabels.map((tab) => (
              <CustomTab
                key={tab.value}
                label={
                  <CustomTabLabel
                    title={tab.title}
                    icon={currentTab === tab.value ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  />
                }
                value={tab.value}
                disableRipple
              />
            ))}
          </Tabs>
        </Box>
      </Grid>

      {currentTab === 'energyContribution' && <EnergyContribution />}
      {currentTab === 'mostImportantData' && <MostImportantData />}
      {currentTab === 'sensitivity' && <Sensitivity />}
      {currentTab === 'calibrated' && <CalibratedVsUncalibrated />}
    </Grid>
  )
}

export default App

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
function CustomTabLabel({ title, icon }) {
  const iconStyle = {
    // Match icon size with line height of the title
    fontSize: '1em',
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {React.cloneElement(icon, { style: iconStyle })}
      <Box sx={{ marginLeft: 1 }}>
        <Typography variant='caption'>{title}</Typography>
      </Box>
    </Box>
  )
}

CustomTabLabel.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

const CustomTab = styled((props) => <Tab {...props} disableRipple />)(({ theme, selected }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  padding: theme.spacing(1),
  borderBottom: selected ? '2px solid #1976d2' : 'none',
  '&:not(:last-child)': {
    marginRight: theme.spacing(1),
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
}))

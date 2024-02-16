import { useState } from 'react'
import PropTypes from 'prop-types'
import SensitivityPlots from './SensitivityPlots'
import { ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Tabs, Tab, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useStore } from './useStore'
import { theme } from './theme'
import { styled } from '@mui/material/styles'
import './App.css'

const App = () => {
  const [weatherFile, setWeatherFile] = useState('file1') // TODO: convert to Zustand

  const { chartLayout, setChartLayout, chartDataSetType, setChartDataSetType } = useStore((state) => ({
    chartDataSetType: state.chartDataSetType,
    setChartDataSetType: state.setChartDataSetType,
    chartLayout: state.chartLayout,
    setChartLayout: state.setChartLayout,
  }))

  const [tabValue, setValue] = useState(0)
  const handleTabChange = (event, newTabValue) => {
    setValue(newTabValue)
  }

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

        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs'
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <CustomTab
              label={<CustomTabLabel title='Title 1' description='Description 1' imageUrl='/path/to/image1.jpg' />}
              selected={tabValue === 0}
              disableRipple
            />
            <CustomTab
              label={<CustomTabLabel title='Title 2' description='Description 2' imageUrl='/path/to/image2.jpg' />}
              selected={tabValue === 1}
              disableRipple
            />
            <CustomTab
              label={<CustomTabLabel title='Title 3' description='Description 3' imageUrl='/path/to/image3.jpg' />}
              selected={tabValue === 2}
              disableRipple
            />
          </Tabs>
          {/* TabPanel components */}
        </Box>

        {/* --- Sensitivity Content ------------------------ */}

        <Grid container item xs={8}>
          <SensitivityPlots />
        </Grid>

        <Grid item xs={4}>
          <Box
            height={40}
            width={80}
            // my={4}
            display='flex'
            alignItems='center'
            color={'text.primary'}
            border={1}
            borderRadius={1}
          >
            XOXO
          </Box>

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

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node, // React node, for the content inside the tab panel
  value: PropTypes.number.isRequired, // Current value/index of the tab
  index: PropTypes.number.isRequired, // The index to match against the current value
  // Include any other props that need validation
}

function CustomTabLabel({ title, description, imageUrl }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img src={imageUrl} alt={`${title}`} style={{ width: 24, height: 24, marginRight: 8 }} />
      <Box>
        <Typography variant='subtitle1'>{title}</Typography>
        <Typography variant='body2' sx={{ opacity: 0.7 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

CustomTabLabel.propTypes = {
  title: PropTypes.string.isRequired, // Title should be a string and is required
  description: PropTypes.string.isRequired, // Description should be a string and is required
  imageUrl: PropTypes.string.isRequired, // Image URL should be a string and is required
}

const CustomTab = styled((props) => <Tab {...props} />)(({ theme, selected }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  padding: theme.spacing(1),
  backgroundColor: selected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
  borderBottom: selected ? '2px solid #1976d2' : 'none',
  '&:not(:last-child)': {
    marginRight: theme.spacing(1),
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
  },
}))

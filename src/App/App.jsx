import { useState } from 'react'
import PropTypes from 'prop-types'
import Sensitivity from '../Sensitivity/Sensitivity'
import Grid from '@mui/material/Grid'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import { useStore } from '../useStore'
import { styled } from '@mui/material/styles'
import './App.css'

const App = () => {
  const [tabValue, setValue] = useState(0)
  const handleTabChange = (event, newTabValue) => {
    setValue(newTabValue)
  }

  return (
    <Grid container padding={4}>
      <Grid xs={12} item marginBottom={4}>
        <Typography variant='h4'>How a Building Loses Energy</Typography>
        <Typography variant='subtitle1' align='left'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.{' '}
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
            label={
              <CustomTabLabel
                title='Working with Missing Data'
                description='Description 1'
                imageUrl='/path/to/image1.jpg'
              />
            }
            selected={tabValue === 0}
            disableRipple
          />
          <CustomTab
            label={
              <CustomTabLabel
                title="What's the Most Important Data?"
                description='Description 2'
                imageUrl='/path/to/image2.jpg'
              />
            }
            selected={tabValue === 1}
            disableRipple
          />
          <CustomTab
            label={
              <CustomTabLabel
                title='Sensitivity to Building Changes'
                description='Description 3'
                imageUrl='/path/to/image3.jpg'
              />
            }
            selected={tabValue === 2}
            disableRipple
          />
        </Tabs>
        {/* TabPanel components */}
      </Box>

      <Sensitivity />
    </Grid>
  )
}

export default App

// ---------------------------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------------------------
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
  backgroundColor: selected ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
  borderBottom: selected ? '2px solid #1976d2' : 'none',
  '&:not(:last-child)': {
    marginRight: theme.spacing(1),
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
  },
}))
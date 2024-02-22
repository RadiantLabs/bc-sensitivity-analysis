import React from 'react'
import { Box, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 2,
        paddingRight: 2,
        marginTop: 'auto',
      }}
    >
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link href='https://agileelectrification.org' target='_blank' rel='noopener'>
          <img
            src='src/assets/agile_electrification_logo.png'
            alt='Agile Electrification Project Logo'
            style={{ width: 120, marginRight: 16 }}
          />
        </Link>
        <Link href='https://radiantlabs.co' target='_blank' rel='noopener'>
          <img
            src='src/assets/RL_logo_light_bg@256w.png'
            alt='Radiant Labs Logo'
            style={{ width: 120, marginRight: 16 }}
          />
        </Link>
        <Typography variant='body2'>
          This project is a collaboration between{' '}
          <Link href='https://radiantlabs.co' target='_blank' rel='noopener'>
            Radiant Labs{' '}
          </Link>
          and the{' '}
          <Link href='https://agileelectrification.org' target='_blank' rel='noopener'>
            Agile Electrification group{' '}
          </Link>
          based out of UCSD.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer

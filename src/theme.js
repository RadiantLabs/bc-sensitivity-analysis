import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'none',
          },
        },
        // track: {
        //   height: 0, // Set track height to 0
        //   color: 'gray', // Set track color to gray
        // },
        // rail: {
        //   color: 'gray', // Set the rail color to gray
        // },
      },
    },
  },
})

import { createTheme } from '@mui/material/styles'
import { slateBlueTheme } from './slateBlueTheme'

export const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true, // Disabling ripple effect for Button
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true, // Disabling ripple effect for IconButton
      },
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true, // Disabling ripple effect for ToggleButton
      },
    },
  },
  ...slateBlueTheme,
})

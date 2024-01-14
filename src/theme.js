import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

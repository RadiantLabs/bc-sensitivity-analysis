import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { highlightColor, inactiveColor, barStroke } from './utils/const'

// Create a styled version of the Slider
export const CustomSlider = styled(Slider)({
  // Notice the & and . for MuiSlider-root has no space between them
  '&.MuiSlider-root': {
    position: 'relative',
    width: '92%',
    color: highlightColor,
    height: 0,
    marginTop: '2px',
  },
  // Notice the & and . for MuiSlider-markLabel have a space between them
  '& .MuiSlider-markLabel': {
    top: '20px',
  },
  '& .MuiSlider-mark': {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    color: barStroke,
  },
  '& .MuiSlider-thumb': {
    border: `0.5px solid ${inactiveColor}`,
    cursor: 'ew-resize', // Cursor is a horizontal line with arrows on each end
    // Create an invisible pseudo-element to increase the hit area of the thumb to take up most of the bar
    '&:before': {
      content: '""', // Necessary to create a pseudo-element
      position: 'absolute',
      // height: chartHeight,
      width: '300%',
      backgroundColor: 'transparent',
      // top: -chartHeight * 0.8,
      left: '50%', // Center horizontally
      transform: 'translateX(-50%)', // Center horizontally
    },
  },
})

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import * as tf from '@tensorflow/tfjs'
import { chartDataSet } from './assets/chartDataSet.js'
import { getInitialSliderValues } from './utils/getInitialSliderValues'
import { predict } from './utils/predict.js'
const modelPath = 'https://permanent-public.s3.us-west-2.amazonaws.com/bill-calibration/model3/model.json'

const initialSliderValues = getInitialSliderValues(chartDataSet, 'evenSteps')
const initialPredictedDataSet = predict(chartDataSet, 'evenSteps')

export const useStore = create(
  devtools((set) => ({
    chartDataSet: chartDataSet,
    setChartDataSet: (newChartDataSet) => set({ chartDataSet: newChartDataSet }),

    // Load model asyncronously. This belongs in state because it's either loaded or not.
    // predictedDataset will depend on model being loaded along with sliderValues and chartDataSet
    model: null,

    // Slider steps can either by evenly distributed or based on percentiles
    stepType: 'evenSteps',
    setStepType: (newStepType) => set({ stepType: newStepType }),

    // This is a derived value from state. I need to decide if this should be in the store.
    predictedDataSet: initialPredictedDataSet,
    setPredictedDataSet: (newPredictedDataSet) => set({ predictedDataSet: newPredictedDataSet }),

    // Slider values will be stored in an object with chartId as key
    sliderValues: initialSliderValues,
    setSliderValue: (chartId, newSliderValue) =>
      set((state) => ({
        sliderValues: { ...state.sliderValues, [chartId]: newSliderValue },
      })),
  }))
)

// --------------------------------------------------
// Helper functions
// --------------------------------------------------
// Async function to fetch bears and update the store
const fetchModel = async () => {
  try {
    const model = await tf.loadLayersModel(modelPath)
    useStore.setState({ model })
  } catch (error) {
    console.error('Failed to fetch model', error)
  }
}
fetchModel()

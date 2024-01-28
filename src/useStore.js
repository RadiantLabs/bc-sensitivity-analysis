import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { chartDataSet } from './assets/chartDataSet.js'
import { getInitialSliderValues } from './utils/getInitialSliderValues'
import { predict } from './utils/predict.js'

const initialSliderValues = getInitialSliderValues(chartDataSet, 'evenSteps')
const initialPredictedDataSet = predict(chartDataSet, 'evenSteps')

console.log('initialSliderValues :>> ', initialSliderValues)
console.log('initialPredictedDataSet :>> ', initialPredictedDataSet)

import { loadModel } from './utils/loadModel'
const modelPath = 'https://permanent-public.s3.us-west-2.amazonaws.com/bill-calibration/model3/model.json'
const model = await loadModel(modelPath)

export const useStore = create(
  devtools((set) => ({
    chartDataSet: chartDataSet,
    setChartDataSet: (newChartDataSet) => set({ chartDataSet: newChartDataSet }),

    // Slider steps can either by evenly distributed or based on percentiles
    stepType: 'evenSteps',
    setStepType: (newStepType) => set({ stepType: newStepType }),

    // Is this where the async predict function should go? Do I have access to the rest of the state?
    // Or is that a derived value from state and shouldn't be redundantly stored in state?
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

import { useMemo } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import take from 'lodash/take'
import { loadLayersModel } from '@tensorflow/tfjs'
import { chartDataSetMixed } from './assets/chartDataSetMixed.js'
import { chartDataSetActionable } from './assets/chartDataSetActionable.js'
import { getInitialSliderValues } from './utils/getInitialSliderValues'
import { predict } from './utils/predict.js'
import { chartCount } from './utils/const.js'
const modelPath = 'https://permanent-public.s3.us-west-2.amazonaws.com/bill-calibration/model3/model.json'

const initialSliderValues = getInitialSliderValues(chartDataSetMixed, 'evenSteps') // returns middle step

export const useStore = create(
  devtools((set) => ({
    chartDataSetType: 'mixed', // mixed, actionable
    chartDataSet: getChartDataSet('mixed'), // take(chartDataSetMixed, chartCount), // Initialized to mixed
    model: null, // Loads async remotely from fetchModel
    stepType: 'evenSteps',
    sliderValues: initialSliderValues, // stored in an object with chartId as key
    yAxisDomain: [0, 6000], // Hardcode for now, later detect max from initial prediction (but not every prediction). See getMaxPredictionValue.js
    chartLayout: 'single', // single, double, triple

    setChartDataSetType: (newChartDataSetType) =>
      set({
        chartDataSetType: newChartDataSetType,
        chartDataSet: getChartDataSet(newChartDataSetType),
      }),
    setStepType: (newStepType) => set({ stepType: newStepType }), // Can be evenly distributed or based on percentiles
    setSliderValue: (chartId, newSliderValue) =>
      set((state) => ({
        sliderValues: { ...state.sliderValues, [chartId]: newSliderValue },
      })),
    setChartLayout: (layout) => set({ chartLayout: layout }),
  }))
)

window.useStore = useStore // Debugging

// Custom React hook that derives predicted results from state. It should only update when dependencies change
// Therefore, any components that depend on this should re-render only when these values change.
export const usePredictedDataSet = () => {
  const { chartDataSet, model, stepType, sliderValues } = useStore()
  return useMemo(() => {
    return predict(chartDataSet, model, sliderValues, stepType) // returns null if any of the inputs are empty
  }, [chartDataSet, model, sliderValues, stepType])
}

// -------------------------------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------------------------------
// Async function to fetch the Tensorflow model and update the store
const fetchModel = async () => {
  try {
    const model = await loadLayersModel(modelPath)
    useStore.setState({ model })
  } catch (error) {
    console.error('Failed to fetch model', error)
  }
}
fetchModel()

function getChartDataSet(newChartDataSetType) {
  return newChartDataSetType === 'mixed'
    ? take(chartDataSetMixed, chartCount) // Return a subset of non-actionable and actionable charts (mixed)
    : take(chartDataSetActionable, chartCount) // Return only actionable chartDataSet
}

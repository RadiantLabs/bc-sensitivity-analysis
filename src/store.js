import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { chartData } from './assets/chartData.js'

const predictedData = [
  { inputValue: 0, predicted: 5900 },
  { inputValue: 1, predicted: 6000 },
  { inputValue: 2, predicted: 6100 },
  { inputValue: 3, predicted: 6200 },
  { inputValue: 4, predicted: 6300 },
  { inputValue: 5, predicted: 6400 },
  { inputValue: 6, predicted: 6500 },
  { inputValue: 7, predicted: 6600 },
  { inputValue: 8, predicted: 6700 },
  { inputValue: 9, predicted: 6800 },
  { inputValue: 10, predicted: 6900 },
  { inputValue: 11, predicted: 7000 },
  { inputValue: 12, predicted: 7100 },
  { inputValue: 13, predicted: 7200 },
  { inputValue: 14, predicted: 7300 },
  { inputValue: 15, predicted: 7400 },
  { inputValue: 16, predicted: 7500 },
  { inputValue: 17, predicted: 7600 },
  { inputValue: 18, predicted: 7700 },
]

const initialPredictedDataSet = [predictedData, predictedData, predictedData]

export const store = create(
  devtools((set) => ({
    chartData: chartData,
    setChartData: (newChartData) => set({ chartData: newChartData }),

    predictedDataSet: initialPredictedDataSet,
    setPredictedDataSet: (newPredictedDataSet) => set({ predictedDataSet: newPredictedDataSet }),

    // Slider values will be stored in an object with chartId as key
    sliderValues: {},
    setSliderValue: (chartId, newSliderValue) =>
      set((state) => ({
        sliderValues: { ...state.sliderValues, [chartId]: newSliderValue },
      })),
  })),
)

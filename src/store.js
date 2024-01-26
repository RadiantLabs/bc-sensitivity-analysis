import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const store = create(
  devtools((set) => ({
    chartData: [],
    setChartData: (newChartData) => set({ chartData: newChartData }),

    initialPredictedDataSet: [],
    setInitialPredictedDataSet: (newPredictedDataSet) => set({ initialPredictedDataSet: newPredictedDataSet }),

    // Slider values will be stored in an object with chartId as key
    sliderValues: {},
    setSliderValue: (chartId, newSliderValue) =>
      set((state) => ({
        sliderValues: { ...state.sliderValues, [chartId]: newSliderValue },
      })),
  })),
)

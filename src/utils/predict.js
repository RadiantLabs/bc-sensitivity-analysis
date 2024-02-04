import * as tf from '@tensorflow/tfjs'
import isEmpty from 'lodash/isEmpty'
import mapKeys from 'lodash/mapKeys'
import has from 'lodash/has'
import chunk from 'lodash/chunk'
import map from 'lodash/map'
import { inputVectorIndexLookup } from '../assets/inputVectorIndexLookup.js'
import { initialInputs } from '../assets/initialInputs.js'
import { functionTimer } from './functionTimer.js'

/* Return an object like:
  BuildingDetails.BuildingSummary.BuildingConstruction.ConditionedFloorArea: [
    {inputValue: 875, predicted: 875}
    {inputValue: 1004, predicted: 1004}
    {inputValue: 1132, predicted: 1132}
  ],
  BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistCrawlspaceVentedExposed1].Area: []
    {inputValue: 0, predicted: 0}
    {inputValue: 9, predicted: 9}
    {inputValue: 17, predicted: 17}
  ]
*/
export function predict(chartDataSet, model, sliderValues, stepType) {
  if (isEmpty(model) || isEmpty(chartDataSet) || isEmpty(sliderValues) || isEmpty(stepType)) {
    return null
  }
  const stepsPerChart = chartDataSet[0][stepType].length

  // Get the input vector of the current slider positions. Not 100% sure this is correct
  const sliderValuesInputVector = buildInputVector(sliderValues, inputVectorIndexLookup, initialInputs)

  // Create tensor that will be passed to Tensorflow.
  // inputTensor: NxM matrix of input vectors.
  // Each row in the matrix represents a chart. Each element in row is the input vector used to predict bar height
  // The tensor needs to be flattened into a single horizontal row and passed into Tensorflow.
  // The prediction will be a single row of scalars (predctions). Then convert back to NxM matrix of predictions
  const inputTensor = chartDataSet.map((chartItem) => {
    const { evenSteps, inputVectorIndex } = chartItem
    return evenSteps.map((inputStep) => {
      const newInputVector = [...sliderValuesInputVector] // Copy the array
      newInputVector[inputVectorIndex] = inputStep // Mutate array, insert slider value at correct index
      return newInputVector
    })
  })

  // Convert to flatted single row of input vectors to pass into tf.tensor2d
  const inputTensorFlattened = inputTensor.flat()

  // Run predictions, 1 for every bar in the charts
  const predictedVector2d = functionTimer('runInference2d', runInference2d, model, inputTensorFlattened)

  // Convert back to 2d matrix of predicted values so they can be used for the charts
  const predictedTensor = chunk(map(predictedVector2d, Math.round), stepsPerChart)

  return chartDataSet.reduce((acc, chartItem, chartIndex) => {
    const { xmlPath } = chartItem
    acc[xmlPath] = chartItem[stepType].map((inputStep, stepIndex) => {
      const predicted = predictedTensor[chartIndex][stepIndex]
      return {
        inputValue: inputStep,
        predicted: predicted,
      }
    })
    return acc
  }, {})
}

// -------------------------------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------------------------------
// This function may need to be called async. Check for async version of predictionResult.dataSync()
function runInference2d(model, inputTensor) {
  const tfInputTensor = tf.tensor2d(inputTensor) // [inputVectorArray1, inputVectorArray2, ...]
  const predictionResult = model.predict(tfInputTensor)
  return predictionResult.dataSync()
}

// First convert xmlPaths to inputVectorIndices.
// Then replace the initialInputs with the sliderValues at the correct index of the input vector
function buildInputVector(sliderValues, inputVectorIndexLookup, initialInputs) {
  const sliderValuesByInputVectorIndices = convertXmlpathToInputVectorIndex(sliderValues, inputVectorIndexLookup)
  return initialInputs.map((input, index) => {
    return has(sliderValuesByInputVectorIndices, index) ? sliderValuesByInputVectorIndices[index] : input
  })
}

// I could skip this if sliderValues contained the inputVectorIndex instead of the xmlPath
// Should I use a tuple to include xmlPath, inputVectorIndex, and sliderValue? Probably not worth it.
function convertXmlpathToInputVectorIndex(sliderValues, inputVectorIndexLookup) {
  return mapKeys(sliderValues, (sliderValue, xmlPath) => inputVectorIndexLookup[xmlPath])
}

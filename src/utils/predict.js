import * as tf from '@tensorflow/tfjs'
import isEmpty from 'lodash/isEmpty'
import random from 'lodash/random'
import mapKeys from 'lodash/mapKeys'
import has from 'lodash/has'
import { inputVectorIndexLookup } from '../assets/inputVectorIndexLookup.js'
import { initialInputs } from '../assets/initialInputs.js'

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
  console.log('sliderValues :>> ', sliderValues)
  const updatedInputVector = buildInputVector(sliderValues, inputVectorIndexLookup, initialInputs)

  const inputTensor = tf.tensor2d([updatedInputVector])
  const predictionResult = model.predict(inputTensor)
  const predictedVector = predictionResult.dataSync()
  console.log('predictedVector :>> ', predictedVector)

  return chartDataSet.reduce((acc, chartItem) => {
    const { xmlPath } = chartItem
    acc[xmlPath] = chartItem[stepType].map((inputStep) => {
      return {
        inputValue: inputStep,
        predicted: inputStep + random(100, 200),
      }
    })
    return acc
  }, {})
}

// -------------------------------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------------------------------
// async function runInference(model, inputs) {
// }

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

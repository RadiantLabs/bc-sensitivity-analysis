import * as tf from '@tensorflow/tfjs'
const modelPath = 'https://permanent-public.s3.us-west-2.amazonaws.com/bill-calibration/model3/model.json'

let model = null

export const loadModel = async (modelPath) => {
  if (!model) {
    model = await tf.loadLayersModel(modelPath)
  }
  return model
}

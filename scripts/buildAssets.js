import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { getPercentiles } from './utils/getPercentiles.js'
import { getInputCodeToXmlPathLookup } from './utils/getInputCodeToXmlPathLookup.js'
import { getChartDataSet } from './utils/getChartDataSet.js'
import { getInputVectorIndexLookup } from './utils/getInputVectorIndexLookup.js'
import { getCSV } from './utils/getCSV.js'
import { toJsonString } from '../src/utils/toJsonString.js'

// Paths to directories
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsPath = path.join(__dirname, '../src/assets')
const intermediatesPath = path.join(__dirname, './intermediates')

// Paths to CSV source files
const modelInputsMetadataSourcePath = path.join(__dirname, 'sources/model_inputs_metadata.csv')
const percentilesSourcePath = path.join(__dirname, 'sources/input_percentiles.csv')
const initialInputsSourcePath = path.join(__dirname, 'sources/initial_inputs.json')
const hudsonWeatherSourcePath = path.join(__dirname, 'sources/hudson_ny.csv')
const santarosaWeatherSourcePath = path.join(__dirname, 'sources/santa_rosa_ca.csv')

// Intermediate output files for debugging
const modelInputsMetadataPath = path.join(intermediatesPath, 'modelInputsMetadata.js')
const inputCodeToXmlPathLookupPath = path.join(intermediatesPath, 'inputCodeToXmlPathLookup.js')
const inputPercentilesOutPath = path.join(intermediatesPath, 'inputPercentiles.js')

// Assets to be bundled
const initialInputsOutPath = path.join(assetsPath, 'initialInputs.js')
const chartDataSetMixedOutPath = path.join(assetsPath, 'chartDataSetMixed.js')
const chartDataSetActionableOutPath = path.join(assetsPath, 'chartDataSetActionable.js')
const hudsonWeatherOutPath = path.join(assetsPath, 'hudsonWeather.js')
const santarosaWeatherOutPath = path.join(assetsPath, 'santarosaWeather.js')

// Function to read CSV and convert to JSON
function buildAssets(modelInputsMetadataSourcePath) {
  const file = fs.readFileSync(modelInputsMetadataSourcePath, 'utf8')
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: async (results) => {
      const modelInputsMetadata = results.data

      // Create lookup table between xmlPath and inputVector index. This is 0(1) instead of looking up
      // the index of a value in an array (which is 0(n)). This lookup is done every slider step interaction.
      const inputVectorIndexLookup = getInputVectorIndexLookup(modelInputsMetadata)

      // Input codes (like X0754) are used instead of xml paths in the percentiles calculation spreadsheet
      // We use xml paths for the rest of the calculations so this maps from input codes to xml paths.
      const inputCodeToXmlPathLookup = getInputCodeToXmlPathLookup(modelInputsMetadata)

      // JP calculated 5%-95% values in steps of 5%. This will be used to create steps of the sliders
      const inputPercentiles = await getPercentiles(percentilesSourcePath, inputCodeToXmlPathLookup)

      // We want to be able to toggle between weather stations to see how that impacts model sensitivity
      const hudsonWeather = await getCSV(hudsonWeatherSourcePath)
      const santarosaWeather = await getCSV(santarosaWeatherSourcePath)

      // Get initial input vector for the model. This is modified by the slider position during interaction
      const initialInputs = JSON.parse(fs.readFileSync(initialInputsSourcePath, 'utf8'))

      // Generate the chart configuration data, including what xml paths are used and the steps for the sliders
      // chartCount will be set later in the app. This just sets a maximum that could be used.
      const chartDataSetMixed = getChartDataSet(modelInputsMetadata, inputPercentiles, {
        chartCount: 40,
        useActionable: false,
      })
      const chartDataSetActionable = getChartDataSet(modelInputsMetadata, inputPercentiles, {
        chartCount: 40,
        useActionable: true,
      })

      // Intermediate output files for debugging
      writeFile(modelInputsMetadata, 'modelInputsMetadata', modelInputsMetadataPath)
      writeFile(inputCodeToXmlPathLookup, 'inputCodeToXmlPathLookup', inputCodeToXmlPathLookupPath)
      writeFile(inputPercentiles, 'inputPercentiles', inputPercentilesOutPath)

      // Final assets to be used in the app
      writeFile(inputVectorIndexLookup, 'inputVectorIndexLookup', path.join(assetsPath, 'inputVectorIndexLookup.js'))
      writeFile(initialInputs, 'initialInputs', initialInputsOutPath)
      writeFile(chartDataSetMixed, 'chartDataSetMixed', chartDataSetMixedOutPath)
      writeFile(chartDataSetActionable, 'chartDataSetActionable', chartDataSetActionableOutPath)
      writeFile(hudsonWeather, 'hudsonWeather', hudsonWeatherOutPath)
      writeFile(santarosaWeather, 'santarosaWeather', santarosaWeatherOutPath)
    },
  })
}

// -------------------------------------------------------------------------
// Main calling function
// -------------------------------------------------------------------------
buildAssets(modelInputsMetadataSourcePath)

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
function writeFile(json, label, outputPath) {
  const jsFile = `export const ${label} = ${toJsonString(json)}`
  fs.writeFileSync(outputPath, jsFile)
  console.log(`${label} file saved to ${outputPath}`)
}

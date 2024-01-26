import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { getInputsSortOrder } from './utils/getInputsSortOrder.js'
import { getTopRankActionable } from './utils/getTopRankActionable.js'
import { getTopRank } from './utils/getTopRank.js'
import { getPercentiles } from './utils/getPercentiles.js'
import { getInputCodeToXmlPathLookup } from './utils/getInputCodeToXmlPathLookup.js'
import { getChartDataSet } from './utils/getChartDataSet.js'
import { xmlPathLabels } from './sources/xmlPathLabels.js'
import { topRankedManual } from './sources/topRankedManual.js'
import { topRankedActionableManual } from './sources/topRankedActionableManual.js'
import { getCSV } from './utils/getCSV.js'
import { toJsonString } from '../src/utils/toJsonString.js'

// Paths to directories
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsPath = path.join(__dirname, '../src/assets')
const intermediatesPath = path.join(__dirname, './intermediates')

// Paths to CSV source files
const modelInputsMetadataSourcePath = path.join(__dirname, 'sources/model_inputs_metadata.csv')
const hudsonWeatherSourcePath = path.join(__dirname, 'sources/hudson_ny.csv')
const santarosaWeatherSourcePath = path.join(__dirname, 'sources/santa_rosa_ca.csv')
const percentilesSourcePath = path.join(__dirname, 'sources/input_percentiles.csv')

// Intermediate output files for debugging
const modelInputsMetadataPath = path.join(intermediatesPath, 'modelInputsMetadata.js')
const topRankedOutPath = path.join(intermediatesPath, 'topRanked.js')
const topRankedActionableOutPath = path.join(intermediatesPath, 'topRankedActionable.js')
const inputCodeToXmlPathLookupPath = path.join(intermediatesPath, 'inputCodeToXmlPathLookup.js')
const inputPercentilesOutPath = path.join(intermediatesPath, 'inputPercentiles.js')

// Assets to be bundled
const inputsSortOrderPath = path.join(assetsPath, 'inputsSortOrder.js')
const chartDataSetOutPath = path.join(assetsPath, 'chartDataSet.js')
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
      const inputsSortOrder = getInputsSortOrder(modelInputsMetadata)
      const topRanked = getTopRank(modelInputsMetadata)
      const topRankedActionable = getTopRankActionable(modelInputsMetadata)

      // Input codes (like X0754) are used instead of xml paths in the percentiles calculation spreadsheet
      // We use xml paths for the rest of the calculations so this maps from input codes to xml paths.
      const inputCodeToXmlPathLookup = getInputCodeToXmlPathLookup(modelInputsMetadata)

      // JP calculated 5% to 95% values for each input in steps of 5%. This will be used to create
      // steps of the sliders
      const inputPercentiles = await getPercentiles(percentilesSourcePath, inputCodeToXmlPathLookup)

      // We want to be able to toggle between weather stations to see how that impacts model sensitivity
      const hudsonWeather = await getCSV(hudsonWeatherSourcePath)
      const santarosaWeather = await getCSV(santarosaWeatherSourcePath)

      // Generate the chart configuration data, including what xml paths are used and the steps for the sliders
      const chartDataSet = getChartDataSet(inputPercentiles, xmlPathLabels, topRankedManual)
      const chartDataSetActionable = getChartDataSet(inputPercentiles, xmlPathLabels, topRankedActionableManual)

      // Intermediate output files for debugging
      writeFile(modelInputsMetadata, 'modelInputsMetadata', modelInputsMetadataPath)
      writeFile(topRanked, 'topRanked', topRankedOutPath)
      writeFile(topRankedActionable, 'topRankedActionable', topRankedActionableOutPath)
      writeFile(inputCodeToXmlPathLookup, 'inputCodeToXmlPathLookup', inputCodeToXmlPathLookupPath)
      writeFile(inputPercentiles, 'inputPercentiles', inputPercentilesOutPath)

      // Final assets to be used in the app
      writeFile(inputsSortOrder, 'inputsSortOrder', inputsSortOrderPath)
      writeFile(chartDataSet, 'chartDataSet', chartDataSetOutPath)
      writeFile(chartDataSetActionable, 'chartDataSetActionable', chartDataSetActionableOutPath)
      writeFile(hudsonWeather, 'hudsonWeather', hudsonWeatherOutPath)
      writeFile(santarosaWeather, 'santarosaWeather', santarosaWeatherOutPath)
    },
  })
}

// -------------------------------------------------------------------------
// Main calling functions
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

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { getInputsSortOrder } from './utils/getInputsSortOrder.js'
import { getTopRankActionable } from './utils/getTopRankActionable.js'
import { getTopRank } from './utils/getTopRank.js'
import { getPercentiles } from './utils/getPercentiles.js'
import { getCodeToXmlPathLookup } from './utils/getCodeToXmlPathLookup.js'
import { getChartData } from './utils/getChartData.js'
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
const sortedXmlOutPath = path.join(intermediatesPath, 'sortedXmlPaths.js')
const topRankedOutPath = path.join(intermediatesPath, 'topRanked.js')
const topRankedActionableOutPath = path.join(intermediatesPath, 'topRankedActionable.js')
const percentilesOutPath = path.join(intermediatesPath, 'inputPercentiles.js')

// Assets to be bundled
const chartDataOutPath = path.join(assetsPath, 'chartData.js')
const chartDataActionableOutPath = path.join(assetsPath, 'chartDataActionable.js')
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
      const sortedXmlPaths = getInputsSortOrder(modelInputsMetadata)
      const topRanked = getTopRank(modelInputsMetadata)
      const topRankedActionable = getTopRankActionable(modelInputsMetadata)
      const codeToXmlPathLookup = getCodeToXmlPathLookup(modelInputsMetadata)
      const percentiles = await getPercentiles(percentilesSourcePath, codeToXmlPathLookup)
      const hudsonWeather = await getCSV(hudsonWeatherSourcePath)
      const santarosaWeather = await getCSV(santarosaWeatherSourcePath)
      const chartData = getChartData(percentiles, xmlPathLabels, topRankedManual)
      const chartDataActionable = getChartData(percentiles, xmlPathLabels, topRankedActionableManual)

      // Intermediate output files for debugging
      writeFile(modelInputsMetadata, 'modelInputsMetadata', modelInputsMetadataPath)
      writeFile(sortedXmlPaths, 'sortedXmlPaths', sortedXmlOutPath)
      writeFile(topRanked, 'topRanked', topRankedOutPath)
      writeFile(topRankedActionable, 'topRankedActionable', topRankedActionableOutPath)
      writeFile(percentiles, 'percentiles', percentilesOutPath)

      // Final assets to be used in the app
      writeFile(chartData, 'chartData', chartDataOutPath)
      writeFile(chartDataActionable, 'chartDataActionable', chartDataActionableOutPath)
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

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { getInputsSortOrder } from './utils/getInputsSortOrder.js'
import { getTopRankActionable } from './utils/getTopRankActionable.js'
import { getTopRank } from './utils/getTopRank.js'
import { getPercentiles } from './utils/getPercentiles.js'
import { getCodeToXmlPathLookup } from './utils/getCodeToXmlPathLookup.js'
import { getCSV } from './utils/getCSV.js'
import { toJsonString } from '../src/utils/toJsonString.js'

// Paths to directories
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsPath = path.join(__dirname, '../src/assets')
const intermediatesPath = path.join(__dirname, './intermediates')

// Paths to CSV source files
const inputsConfigSourcePath = path.join(__dirname, 'sources/inputs_config_source.csv')
const hudsonWeatherSourcePath = path.join(__dirname, 'sources/hudson_ny.csv')
const santarosaWeatherSourcePath = path.join(__dirname, 'sources/santa_rosa_ca.csv')
const percentilesSourcePath = path.join(__dirname, 'sources/input_percentiles.csv')

// Intermediate output files for debugging
const sortedXmlOutPath = path.join(intermediatesPath, 'sortedXmlPaths.js')
const topRankedOutPath = path.join(intermediatesPath, 'topRanked.js')
const topRankedActionableOutPath = path.join(intermediatesPath, 'topRankedActionable.js')
const percentilesOutPath = path.join(intermediatesPath, 'inputPercentiles.js')

// Assets to be bundled
const hudsonWeatherOutPath = path.join(assetsPath, 'hudsonWeather.js')
const santarosaWeatherOutPath = path.join(assetsPath, 'santarosaWeather.js')

// Function to read CSV and convert to JSON
function buildInputsConfigAssets(inputsConfigSourcePath) {
  const file = fs.readFileSync(inputsConfigSourcePath, 'utf8')
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: async (results) => {
      const inputsConfig = results.data // Don't need to write to file
      const sortedXmlPaths = getInputsSortOrder(inputsConfig)
      const topRanked = getTopRank(inputsConfig)
      const topRankedActionable = getTopRankActionable(inputsConfig)
      const codeToXmlPathLookup = getCodeToXmlPathLookup(inputsConfig)
      const percentiles = await getPercentiles(percentilesSourcePath, codeToXmlPathLookup)
      const hudsonWeather = await getCSV(hudsonWeatherSourcePath)
      const santarosaWeather = await getCSV(santarosaWeatherSourcePath)

      // Intermediate output files for debugging
      writeFile(sortedXmlPaths, 'sortedXmlPaths', sortedXmlOutPath)
      writeFile(topRanked, 'topRanked', topRankedOutPath)
      writeFile(topRankedActionable, 'topRankedActionable', topRankedActionableOutPath)
      writeFile(percentiles, 'percentiles', percentilesOutPath)

      // Final assets to be used in the app
      writeFile(hudsonWeather, 'hudsonWeather', hudsonWeatherOutPath)
      writeFile(santarosaWeather, 'santarosaWeather', santarosaWeatherOutPath)
    },
  })
}

// -------------------------------------------------------------------------
// Main calling functions
// -------------------------------------------------------------------------
buildInputsConfigAssets(inputsConfigSourcePath)

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
function writeFile(json, label, outputPath) {
  const jsFile = `export const ${label} = ${toJsonString(json)}`
  fs.writeFileSync(outputPath, jsFile)
  console.log(`${label} file saved to ${outputPath}`)
}

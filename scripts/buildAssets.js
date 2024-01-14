import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { getInputsSortOrder } from './utils/getInputsSortOrder.js'
import { getTopRankActionable } from './utils/getTopRankActionable.js'
import { getTopRank } from './utils/getTopRank.js'
import { getWeather } from './utils/getWeather.js'
import { toJsonString } from '../src/utils/toJsonString.js'

// Paths to CSV source and JS output files
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsPath = path.join(__dirname, '../src/assets')
const inputsConfigSourcePath = path.join(__dirname, 'sources/inputs_config_source.csv')
const inputsConfigOutPath = path.join(assetsPath, 'inputsConfig.js')
const sortedXmlOutPath = path.join(assetsPath, 'sortedXmlPaths.js')
const topRankedOutPath = path.join(assetsPath, 'topRanked.js')
const topRankedActionableOutPath = path.join(assetsPath, 'topRankedActionable.js')
const hudsonWeatherSourcePath = path.join(__dirname, 'sources/hudson_ny.csv')
const hudsonWeatherOutPath = path.join(assetsPath, 'hudsonWeather.js')
const santarosaWeatherSourcePath = path.join(__dirname, 'sources/santa_rosa_ca.csv')
const santarosaWeatherOutPath = path.join(assetsPath, 'santarosaWeather.js')

const topRankCount = 20
const topRankActionableCount = 20

// Function to read CSV and convert to JSON
function buildInputsConfigAssets(inputsConfigSourcePath, inputsConfigOutPath) {
  const file = fs.readFileSync(inputsConfigSourcePath, 'utf8')
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      const inputsConfig = results.data
      const sortedXmlPaths = getInputsSortOrder(inputsConfig)
      const topRanked = getTopRank(inputsConfig, topRankCount)
      const topRankedActionable = getTopRankActionable(inputsConfig, topRankActionableCount)
      writeFile(inputsConfig, 'inputsConfig', inputsConfigOutPath)
      writeFile(sortedXmlPaths, 'sortedXmlPaths', sortedXmlOutPath)
      writeFile(topRanked, 'topRanked', topRankedOutPath)
      writeFile(topRankedActionable, 'topRankedActionable', topRankedActionableOutPath)
    },
  })
}

async function buildWeatherAssets(weatherSourcePath, label, weatherPath) {
  const weatherJson = await getWeather(weatherSourcePath)
  writeFile(weatherJson, label, weatherPath)
}

// -------------------------------------------------------------------------
// Main calling functions
// -------------------------------------------------------------------------
buildInputsConfigAssets(inputsConfigSourcePath, inputsConfigOutPath)
buildWeatherAssets(hudsonWeatherSourcePath, 'hudsonWeather', hudsonWeatherOutPath)
buildWeatherAssets(santarosaWeatherSourcePath, 'santarosaWeather', santarosaWeatherOutPath)

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
function writeFile(json, label, outputPath) {
  const jsFile = `export const ${label} = ${toJsonString(json)}`
  fs.writeFileSync(outputPath, jsFile)
  console.log(`${label} file saved to ${outputPath}`)
}

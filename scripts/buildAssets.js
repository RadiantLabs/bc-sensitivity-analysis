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

// Assets to be bundled
const hudsonWeatherOutPath = path.join(assetsPath, 'hudsonWeather.js')
const santarosaWeatherOutPath = path.join(assetsPath, 'santarosaWeather.js')
const percentilesOutPath = path.join(assetsPath, 'inputPercentiles.js')

const topRankCount = 100
const topRankActionableCount = 100

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
      const topRanked = getTopRank(inputsConfig, topRankCount)
      const topRankedActionable = getTopRankActionable(inputsConfig, topRankActionableCount)
      const codeToXmlPathLookup = getCodeToXmlPathLookup(inputsConfig) // Don't need to write to file

      writeFile(sortedXmlPaths, 'sortedXmlPaths', sortedXmlOutPath)
      writeFile(topRanked, 'topRanked', topRankedOutPath)
      writeFile(topRankedActionable, 'topRankedActionable', topRankedActionableOutPath)

      // TODO: I probably don't want to write this to file. Only take the top 20
      await buildPercentileAssets(percentilesSourcePath, 'inputPercentiles', percentilesOutPath, codeToXmlPathLookup)
    },
  })
}

async function buildWeatherAssets(sourcePath, label, outPath) {
  const json = await getCSV(sourcePath)
  writeFile(json, label, outPath)
}

async function buildPercentileAssets(sourcePath, label, outPath, codeToXmlPathLookup) {
  const json = await getCSV(sourcePath)
  const percentiles = getPercentiles(json, codeToXmlPathLookup)
  writeFile(percentiles, label, outPath)
}

// -------------------------------------------------------------------------
// Main calling functions
// -------------------------------------------------------------------------
buildInputsConfigAssets(inputsConfigSourcePath)
buildWeatherAssets(hudsonWeatherSourcePath, 'hudsonWeather', hudsonWeatherOutPath)
buildWeatherAssets(santarosaWeatherSourcePath, 'santarosaWeather', santarosaWeatherOutPath)
// buildPercentileAssets(percentilesSourcePath, 'inputPercentiles', percentilesOutPath)

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------
function writeFile(json, label, outputPath) {
  const jsFile = `export const ${label} = ${toJsonString(json)}`
  fs.writeFileSync(outputPath, jsFile)
  console.log(`${label} file saved to ${outputPath}`)
}
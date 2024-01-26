import { getCSV } from './getCSV.js'
import sortBy from 'lodash/sortBy'
import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'

/*
1. First remove count, mean, std, min, max.
2. Sort by percentile
3. Remove percentil key/value
4. Then we have this::
    [
      {
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_01": 10.21834677,
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_02": 16.84040179,
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_03": 20.05172043,
      },
      {
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_01": 13.10586022,
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_02": 17.05459821,
        "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_03": 20.62048387,
      }
    ]

The reduce function converts it to this:
    {
      "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_01": [10.21834677, 13.10586022],
      "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_02": [16.84040179, 17.05459821],
      "WEATHER_DIFFUSE_SOLAR_RADIATION_AVG_03": [20.05172043, 20.62048387],
    }
5. Replace the codes with xmlPaths

*/
export async function getPercentiles(sourcePath, inputCodeToXmlPathLookup) {
  const rawJson = await getCSV(sourcePath)

  // Remove count, std, min, max, mean
  const percentilesOnly = rawJson.filter((row) => row.percentile.includes('%'))

  // Make sure this array of objects is sorted by percentile
  const sortedPercentiles = sortBy(percentilesOnly, (row) => parseInt(row.percentile.replace('%', ''), 10))

  // Remove percentile column
  const codesOnly = sortedPercentiles.map((row) => omit(row, 'percentile'))

  // Create an object of arrays, where each array is a list of percentiles for a given code
  const percentilesAsCodes = codesOnly.reduce((acc, row) => {
    Object.keys(row).forEach((code) => {
      if (!acc[code]) {
        acc[code] = []
      }
      acc[code].push(row[code])
    })
    return acc
  }, {})

  // Replace codes with xmlPaths
  const percentilesAsXmlPaths = mapKeys(percentilesAsCodes, (val, codeKey) => inputCodeToXmlPathLookup[codeKey])

  return percentilesAsXmlPaths
}

import Papa from 'papaparse'
import fs from 'fs'

export function getWeather(csvFilePath) {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(csvFilePath, 'utf8')
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

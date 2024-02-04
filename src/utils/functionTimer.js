export function functionTimer(fnName, fn, ...args) {
  const startTime = performance.now()
  const result = fn(...args) // Execute the function with its arguments
  const endTime = performance.now()

  const timeTaken = endTime - startTime // Time taken in milliseconds
  console.log(`${fnName} - Time taken: ${timeTaken.toFixed(2)}ms`)

  return result // Return the function's result
}

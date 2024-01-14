// Convert any JS object to a string, pretty printed.
export function toJsonString(jsObj) {
  return JSON.stringify(jsObj, null, 2)
}

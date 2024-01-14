export function getTopRankActionable(inputsConfig, topCount = 20) {
  return inputsConfig
    .filter((item) => item.isActionable === true)
    .filter((item) => item.importanceRank !== null)
    .sort((a, b) => a.importanceRank - b.importanceRank)
    .slice(0, topCount)
}

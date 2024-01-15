// There are many top ranked that are effectively duplicates. Use this to ouput a bigger list then
// mannualy select
export function getTopRankActionable(inputsConfig, topCount = 100) {
  return inputsConfig
    .filter((item) => item.isActionable === true)
    .filter((item) => item.importanceRank !== null)
    .sort((a, b) => a.importanceRank - b.importanceRank)
    .slice(0, topCount)
}

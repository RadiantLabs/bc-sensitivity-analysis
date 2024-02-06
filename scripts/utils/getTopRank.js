import _ from 'lodash'

// There are many top ranked that are effectively duplicates. Use this to ouput a bigger list then
// mannualy select
export function getTopRank(inputsConfig, topCount = 100) {
  return inputsConfig
    .filter((item) => item.importanceRank !== null)
    .filter((item) => !!item.isRelevant) // Kelly determined these but they are all actionable
    .filter((item) => _.isEmpty(item.categoricalValue))
    .sort((a, b) => a.importanceRank - b.importanceRank)
    .slice(0, topCount)
}

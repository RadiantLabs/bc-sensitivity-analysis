export const chartDataSet = [
  {
    xmlPath: 'HPXML.Building.BuildingDetails.BuildingSummary.BuildingConstruction.ConditionedFloorArea',
    label: 'Conditioned Floor Area',
    percentileSteps: [875, 1000, 1090, 1160, 1226, 1295, 1360, 1428, 1500, 1580, 1671, 1770, 1874, 1992, 2128, 2287, 2500, 2800, 3320],
    evenSteps: [875, 1004, 1132, 1261, 1390, 1518, 1647, 1776, 1904, 2033, 2162, 2291, 2419, 2548, 2677, 2805, 2934, 3063, 3191, 3320],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Walls.Wall[WallExposed1].Area',
    label: 'Exposed Wall Area',
    percentileSteps: [944, 1016, 1072, 1112, 1152, 1192, 1232, 1280, 1344, 1416, 1520, 1632, 1744, 1872, 1992, 2112, 2240, 2416, 2736],
    evenSteps: [944, 1038, 1133, 1227, 1321, 1416, 1510, 1604, 1699, 1793, 1887, 1981, 2076, 2170, 2264, 2359, 2453, 2547, 2642, 2736],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistCrawlspaceVentedExposed1].Area',
    label: 'Rim Joist Crawl Exposed Area',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 85, 109, 119, 126, 133, 138, 144, 152, 164],
    evenSteps: [0, 9, 17, 26, 35, 43, 52, 60, 69, 78, 86, 95, 104, 112, 121, 129, 138, 147, 155, 164],
  },
]

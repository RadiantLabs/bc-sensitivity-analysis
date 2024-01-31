export const chartDataSet = [
  {
    xmlPath: 'HPXML.Building.BuildingDetails.BuildingSummary.BuildingConstruction.ConditionedFloorArea',
    inputVectorIndex: 300,
    label: 'Conditioned Floor Area',
    percentileSteps: [875, 1000, 1090, 1160, 1226, 1295, 1360, 1428, 1500, 1580, 1671, 1770, 1874, 1992, 2128, 2287, 2500, 2800, 3320],
    evenSteps: [875, 1004, 1132, 1261, 1390, 1518, 1647, 1776, 1904, 2033, 2162, 2291, 2419, 2548, 2677, 2805, 2934, 3063, 3191, 3320],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Walls.Wall[WallExposed1].Area',
    inputVectorIndex: 423,
    label: 'Exposed Wall Area',
    percentileSteps: [944, 1016, 1072, 1112, 1152, 1192, 1232, 1280, 1344, 1416, 1520, 1632, 1744, 1872, 1992, 2112, 2240, 2416, 2736],
    evenSteps: [944, 1038, 1133, 1227, 1321, 1416, 1510, 1604, 1699, 1793, 1887, 1981, 2076, 2170, 2264, 2359, 2453, 2547, 2642, 2736],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistCrawlspaceVentedExposed1].Area',
    inputVectorIndex: 361,
    label: 'Rim Joist Crawl Exposed Area',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 85, 109, 119, 126, 133, 138, 144, 152, 164],
    evenSteps: [0, 9, 17, 26, 35, 43, 52, 60, 69, 78, 86, 95, 104, 112, 121, 129, 138, 147, 155, 164],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistStory2Exposed].Area',
    inputVectorIndex: 367,
    label: 'Rim Joist 2nd Story Exposed Area',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 96, 105, 112, 120, 127, 134, 142, 155],
    evenSteps: [0, 8, 16, 24, 33, 41, 49, 57, 65, 73, 82, 90, 98, 106, 114, 122, 131, 139, 147, 155, 163],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Appliances.ClothesDryer.extension.VentedFlowRate',
    inputVectorIndex: 291,
    label: 'Dryer Vented Flow Rate',
    percentileSteps: [0, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
    evenSteps: [0, 8, 16, 24, 32, 39, 47, 55, 63, 71, 79, 87, 95, 103, 111, 118, 126, 134, 142, 150],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Windows.Window[WindowSouth1].Area',
    inputVectorIndex: 458,
    label: 'Window South Area',
    percentileSteps: [0, 0, 32, 36, 38, 39, 41, 42, 44, 46, 49, 53, 57, 62, 67, 72, 77, 84, 96],
    evenSteps: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Windows.Window[WindowNorth1].Area',
    inputVectorIndex: 447,
    label: 'Window North Area',
    percentileSteps: [0, 0, 32, 36, 38, 39, 41, 42, 44, 46, 49, 53, 57, 62, 67, 72, 77, 84, 96],
    evenSteps: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 51, 56, 61, 66, 71, 76, 81, 86, 91, 96],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Windows.Window[WindowEast1].Area',
    inputVectorIndex: 435,
    label: 'Window East Area',
    percentileSteps: [0, 0, 32, 36, 38, 39, 41, 42, 44, 46, 49, 53, 57, 62, 67, 72, 77, 83, 95],
    evenSteps: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Windows.Window[WindowWest1].Area',
    inputVectorIndex: 462,
    label: 'Window West Area',
    percentileSteps: [0, 0, 32, 36, 38, 39, 41, 42, 44, 46, 49, 53, 57, 62, 67, 72, 77, 83, 95],
    evenSteps: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.WaterHeating.WaterHeatingSystem[WaterHeater1].TankVolume',
    inputVectorIndex: 581,
    label: 'Water Heater Tank Volume',
    percentileSteps: [40, 40, 40, 40, 40, 40, 40, 40, 50, 50, 65, 65, 80, 80, 80, 80, 80, 80, 80],
    evenSteps: [40, 42, 44, 46, 48, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 72, 74, 76, 78, 80, 82],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.SetupTempCoolingSeason',
    inputVectorIndex: 315,
    label: 'Setup Temp Cooling Season',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82],
    evenSteps: [0, 4, 9, 13, 17, 22, 26, 30, 35, 39, 43, 47, 52, 56, 60, 65, 69, 73, 78, 82],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.SetbackTempHeatingSeason',
    inputVectorIndex: 314,
    label: 'Setback Temp Heating Season',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
    evenSteps: [0, 3, 7, 10, 13, 17, 20, 24, 27, 30, 34, 37, 40, 44, 47, 51, 54, 57, 61, 64],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.FrameFloors.FrameFloor[FloorBelowAttic1].Insulation.AssemblyEffectiveRValue',
    inputVectorIndex: 354,
    label: 'Attic Insulation',
    percentileSteps: [15, 15, 15, 15, 15, 21, 21, 31, 31, 31, 32, 32, 32, 32, 32, 32, 40, 46, 46],
    evenSteps: [15, 17, 18, 20, 22, 23, 25, 26, 28, 30, 31, 33, 35, 36, 38, 39, 41, 43, 44, 46],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.TotalSetbackHoursperWeekHeating',
    inputVectorIndex: 316,
    label: 'Total Setback Hours/Week Heating',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49],
    evenSteps: [0, 3, 5, 8, 10, 13, 15, 18, 21, 23, 26, 28, 31, 34, 36, 39, 41, 44, 46, 49],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.TotalSetupHoursperWeekCooling',
    inputVectorIndex: 317,
    label: 'Total Setup Hours/Week Cooling',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42],
    evenSteps: [0, 2, 4, 7, 9, 11, 13, 15, 18, 20, 22, 24, 27, 29, 31, 33, 35, 38, 40, 42],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.extension.SetbackStartHourHeating',
    inputVectorIndex: 318,
    label: 'Setback Start Hour Heating',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23],
    evenSteps: [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACPlant[HVACPlant1].HeatPump[ASHP1].AnnualCoolingEfficiency.Value',
    inputVectorIndex: 507,
    label: 'Heat Pump Cooling Efficiency',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 16, 16, 16, 16, 17],
    evenSteps: [0, 1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16, 17],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Walls.Wall[WallExposed1].Insulation.AssemblyEffectiveRValue',
    inputVectorIndex: 425,
    label: 'Wall Exposed Insulation',
    percentileSteps: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 11, 11, 11, 12, 16, 16],
    evenSteps: [4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 13, 14, 15, 15, 16],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.AirInfiltration.AirInfiltrationMeasurement.BuildingAirLeakage.AirLeakage',
    inputVectorIndex: 311,
    label: 'Air Leakage',
    percentileSteps: [5, 7, 7, 7, 7, 10, 10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    evenSteps: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistStory2Exposed].Insulation.AssemblyEffectiveRValue',
    inputVectorIndex: 379,
    label: 'Rim Joist 2nd Story Insulation',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 11, 11, 16],
    evenSteps: [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16],
  },
]

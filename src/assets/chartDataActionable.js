export const chartDataActionable = [
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Appliances.ClothesDryer.extension.VentedFlowRate',
    percentileSteps: [0, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
    evenSteps: [0, 8, 16, 24, 32, 39, 47, 55, 63, 71, 79, 87, 95, 103, 111, 118, 126, 134, 142, 150],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.WaterHeating.WaterHeatingSystem[WaterHeater1].TankVolume',
    percentileSteps: [40, 40, 40, 40, 40, 40, 40, 40, 50, 50, 65, 65, 80, 80, 80, 80, 80, 80, 80],
    evenSteps: [40, 42, 44, 46, 48, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 72, 74, 76, 78, 80, 82],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.SetupTempCoolingSeason',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82],
    evenSteps: [0, 4, 9, 13, 17, 22, 26, 30, 35, 39, 43, 47, 52, 56, 60, 65, 69, 73, 78, 82],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.SetbackTempHeatingSeason',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
    evenSteps: [0, 3, 7, 10, 13, 17, 20, 24, 27, 30, 34, 37, 40, 44, 47, 51, 54, 57, 61, 64],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.FrameFloors.FrameFloor[FloorBelowAttic1].Insulation.AssemblyEffectiveRValue',
    percentileSteps: [15, 15, 15, 15, 15, 21, 21, 31, 31, 31, 32, 32, 32, 32, 32, 32, 40, 46, 46],
    evenSteps: [15, 17, 18, 20, 22, 23, 25, 26, 28, 30, 31, 33, 35, 36, 38, 39, 41, 43, 44, 46],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.TotalSetbackHoursperWeekHeating',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49],
    evenSteps: [0, 3, 5, 8, 10, 13, 15, 18, 21, 23, 26, 28, 31, 34, 36, 39, 41, 44, 46, 49],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.TotalSetupHoursperWeekCooling',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42],
    evenSteps: [0, 2, 4, 7, 9, 11, 13, 15, 18, 20, 22, 24, 27, 29, 31, 33, 35, 38, 40, 42],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACPlant[HVACPlant1].HeatPump[ASHP1].AnnualCoolingEfficiency.Value',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 16, 16, 16, 16, 17],
    evenSteps: [0, 1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16, 17],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Walls.Wall[WallExposed1].Insulation.AssemblyEffectiveRValue',
    percentileSteps: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 11, 11, 11, 12, 16, 16],
    evenSteps: [4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 13, 14, 15, 15, 16],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.AirInfiltration.AirInfiltrationMeasurement.BuildingAirLeakage.AirLeakage',
    percentileSteps: [5, 7, 7, 7, 7, 10, 10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    evenSteps: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.RimJoists.RimJoist[RimJoistStory2Exposed].Insulation.AssemblyEffectiveRValue',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 11, 11, 16],
    evenSteps: [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACPlant[HVACPlant1].HeatPump[ASHP1].AnnualHeatingEfficiency.Value',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 11, 14, 14, 14, 14],
    evenSteps: [0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 10, 10, 11, 12, 13, 13, 14],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACControl.extension.SetupStartHourCooling',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    evenSteps: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Appliances.ClothesDryer.CombinedEnergyFactor',
    percentileSteps: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    evenSteps: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.WaterHeating.WaterHeatingSystem[WaterHeater1].EnergyFactor',
    percentileSteps: [1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    evenSteps: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.FrameFloors.FrameFloor[FloorAboveVentedCrawl1].Insulation.AssemblyEffectiveRValue',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    evenSteps: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Systems.HVAC.HVACDistribution[HVACDistributionAir1].DistributionSystemType.AirDistribution.NumberofReturnRegisters',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
    evenSteps: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3],
  },
  {
    xmlPath: 'HPXML.Building.BuildingDetails.Enclosure.Slabs.Slab[SlabOfBasementConditioned1].extension.CarpetRValue',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    evenSteps: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  },
  {
    xmlPath:
      'HPXML.Building.BuildingDetails.Systems.HVAC.HVACDistribution[HVACDistributionAir1].DistributionSystemType.AirDistribution.DuctLeakageMeasurement[HVACDistributionAir1Supply].DuctLeakage.TotalOrToOutside',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    evenSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    xmlPath:
      'HPXML.Building.BuildingDetails.Systems.HVAC.HVACDistribution[HVACDistributionAir1].DistributionSystemType.AirDistribution.DuctLeakageMeasurement[HVACDistributionAir1Return].DuctLeakage.TotalOrToOutside',
    percentileSteps: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    evenSteps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
]

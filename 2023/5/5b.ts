import INPUTS from "./5_test.json";

const mapLine = (line: string) => line.split(" ").map((a) => parseInt(a));
const sortMapping = (a: number[], b: number[]) => a[1] - b[1];
//[min,max]
const seedRanges: [number, number][] = [];

const seedList = mapLine(INPUTS.seeds);
for (let i = 0; i < seedList.length; i += 2) {
  seedRanges.push([seedList[i], seedList[i] + seedList[i + 1] - 1]);
}

const seedToSoilMap = INPUTS.seedToSoilMap.map(mapLine).sort(sortMapping);
const soilToFertilzerMap = INPUTS.soilToFertilizerMap
  .map(mapLine)
  .sort(sortMapping);
const fertilizerToWaterMap = INPUTS.fertilizerToWaterMap
  .map(mapLine)
  .sort(sortMapping);
const waterToLightMap = INPUTS.waterToLightMap.map(mapLine).sort(sortMapping);
const lightToTemperatureMap = INPUTS.lightToTemperatureMap
  .map(mapLine)
  .sort(sortMapping);
const temperatureToHumidityMap = INPUTS.temperatureToHumidityMap
  .map(mapLine)
  .sort(sortMapping);
const humidityToLocationMap = INPUTS.humidityToLocationMap
  .map(mapLine)
  .sort(sortMapping);

function mapRange(
  mapping: number[][],
  [min, max]: [number, number],
): [number, number][] {
  const resultingRanges: [number, number][] = [];
  //TODO: handle holes in the ranges
  let lastMax;

  for (const mapLine of mapping) {
    const startIndex = min - mapLine[1];
    if (startIndex >= mapLine[2]) {
      //the current min is further than the current mapLine range (should only happen at the start of the given range argument)
      continue;
    } else if (startIndex < 0) {
      //TODO: handle holes in the ranges
    } else {
      //min is in the mapLine range
      const end = Math.min(max, mapLine[1] + mapLine[2] - 1);
      resultingRanges.push([min, end]);
      if (end === max) {
        //max is in the mapLine range
        return resultingRanges;
      }
      min = end + 1;
    }
  }

  resultingRanges.push([min, max]);
  return resultingRanges;
}

const soilRanges = seedRanges.flatMap((range) =>
  mapRange(seedToSoilMap, range),
);
const fertilizerRanges = soilRanges.flatMap((range) =>
  mapRange(soilToFertilzerMap, range),
);
const waterRanges = fertilizerRanges.flatMap((range) =>
  mapRange(fertilizerToWaterMap, range),
);
const lightRanges = waterRanges.flatMap((range) =>
  mapRange(waterToLightMap, range),
);
const temperatureRanges = lightRanges.flatMap((range) =>
  mapRange(lightToTemperatureMap, range),
);
const humidityRanges = temperatureRanges.flatMap((range) =>
  mapRange(temperatureToHumidityMap, range),
);
const locationRanges = humidityRanges.flatMap((range) =>
  mapRange(humidityToLocationMap, range),
);

const lowestLocation = locationRanges.reduce(
  (acc, range) => Math.min(acc, range[0]),
  Number.MAX_SAFE_INTEGER,
);

console.log("result", lowestLocation);

import INPUTS from "./5.json";

const mapLine = (line: string) => line.split(" ").map((a) => parseInt(a));

const seeds = mapLine(INPUTS.seeds);

const seedToSoilMap = INPUTS.seedToSoilMap.map(mapLine);
const soilToFertilzerMap = INPUTS.soilToFertilizerMap.map(mapLine);
const fertilizerToWaterMap = INPUTS.fertilizerToWaterMap.map(mapLine);
const waterToLightMap = INPUTS.waterToLightMap.map(mapLine);
const lightToTemperatureMap = INPUTS.lightToTemperatureMap.map(mapLine);
const temperatureToHumidityMap = INPUTS.temperatureToHumidityMap.map(mapLine);
const humidityToLocationMap = INPUTS.humidityToLocationMap.map(mapLine);

function map(mapping: number[][], input: number) {
  for (const mapLine of mapping) {
    const index = input - mapLine[1];
    if (index >= 0 && index < mapLine[2]) {
      return mapLine[0] + index;
    }
  }
  return input;
}

let lowestLocation = Number.MAX_SAFE_INTEGER;

for (const seed of seeds) {
  const soil = map(seedToSoilMap, seed);
  const fertilizer = map(soilToFertilzerMap, soil);
  const water = map(fertilizerToWaterMap, fertilizer);
  const light = map(waterToLightMap, water);
  const temperature = map(lightToTemperatureMap, light);
  const humidity = map(temperatureToHumidityMap, temperature);
  const location = map(humidityToLocationMap, humidity);
  if (location <= lowestLocation) {
    lowestLocation = location;
  }
}

console.log("result", lowestLocation);

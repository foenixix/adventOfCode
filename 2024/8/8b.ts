import INPUTS from "./8.json";

const map = INPUTS.value;

const antennas: Record<string, [number, number][]> = {};

map.forEach((row, y) => {
  for (const match of row.matchAll(/[\d|\w]/g)) {
    const char = match[0];
    const x = match.index;
    if (!antennas[char]) {
      antennas[char] = [];
    }
    antennas[char].push([x, y]);
  }
});

function isInBounds(x: number, y: number) {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function greatestCommonDivisor(a: number, b: number) {
  if (b === 0) {
    return a;
  }

  return greatestCommonDivisor(b, a % b);
}

const locations = new Set<string>();

function checkAntinodes(
  [currX, currY]: [number, number],
  [otherX, otherY]: [number, number],
) {
  locations.add(`${currX},${currY}`);
  locations.add(`${otherX},${otherY}`);

  let xDiff = Math.abs(otherX - currX);
  let yDiff = Math.abs(otherY - currY);
  const divisor = greatestCommonDivisor(xDiff, yDiff);
  xDiff /= divisor;
  yDiff /= divisor;

  let currAntinodeX = currX < otherX ? currX - xDiff : currX + xDiff;
  let currAntinodeY = currY < otherY ? currY - yDiff : currY + yDiff;
  while (isInBounds(currAntinodeX, currAntinodeY)) {
    locations.add(`${currAntinodeX},${currAntinodeY}`);
    currAntinodeX += currX < otherX ? -xDiff : xDiff;
    currAntinodeY += currY < otherY ? -yDiff : yDiff;
  }

  let otherAntinodeX = currX < otherX ? otherX + xDiff : otherX - xDiff;
  let otherAntinodeY = currY < otherY ? otherY + yDiff : otherY - yDiff;
  while (isInBounds(otherAntinodeX, otherAntinodeY)) {
    locations.add(`${otherAntinodeX},${otherAntinodeY}`);
    otherAntinodeX += currX < otherX ? xDiff : -xDiff;
    otherAntinodeY += currY < otherY ? yDiff : -yDiff;
  }
}

Object.values(antennas).forEach((positions) => {
  positions.forEach((currAntenna, i) => {
    if (i >= positions.length - 1) {
      return;
    }
    positions
      .slice(i + 1)
      .forEach((otherAntenna) => checkAntinodes(currAntenna, otherAntenna));
  });
});

console.log(locations.size);

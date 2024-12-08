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

const locations = new Set<string>();

function checkAntinodes(
  [currX, currY]: [number, number],
  [otherX, otherY]: [number, number],
) {
  const xDiff = Math.abs(otherX - currX);
  const yDiff = Math.abs(otherY - currY);

  const currAntinodeX = currX < otherX ? currX - xDiff : currX + xDiff;
  const currAntinodeY = currY < otherY ? currY - yDiff : currY + yDiff;
  if (isInBounds(currAntinodeX, currAntinodeY)) {
    locations.add(`${currAntinodeX},${currAntinodeY}`);
  }

  const otherAntinodeX = currX < otherX ? otherX + xDiff : otherX - xDiff;
  const otherAntinodeY = currY < otherY ? otherY + yDiff : otherY - yDiff;
  if (isInBounds(otherAntinodeX, otherAntinodeY)) {
    locations.add(`${otherAntinodeX},${otherAntinodeY}`);
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

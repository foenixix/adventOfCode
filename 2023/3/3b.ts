import INPUTS from "./3.json";

const lines = INPUTS.data;

let result = 0;
for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const indices = [...line.matchAll(/\*/g)].map(({ index }) => index);
  for (const x of indices) {
    result += getGearRatio(x, y);
  }
}

function getGearRatio(x: number, y: number): number {
  const minX = Math.max(0, x - 1);
  const maxX = Math.min(lines[0].length - 1, x + 1);
  const minY = Math.max(0, y - 1);
  const maxY = Math.min(lines.length - 1, y + 1);

  const gearConnections: [number, number][] = [];

  for (let checkY = minY; checkY < maxY + 1; checkY++) {
    let lastCharWasDigit = false;
    for (let checkX = minX; checkX < maxX + 1; checkX++) {
      const isChar = !isNaN(parseInt(lines[checkY][checkX]));

      if (isChar) {
        if (lastCharWasDigit) {
          continue;
        }

        lastCharWasDigit = true;
        gearConnections.push([checkX, checkY]);
      } else {
        lastCharWasDigit = false;
      }
    }
  }

  if (gearConnections.length !== 2) {
    return 0;
  } else {
    return getNumber(gearConnections[0]) * getNumber(gearConnections[1]);
  }
}

function getNumber([x, y]: [number, number]): number {
  while (x > 0 && !isNaN(parseInt(lines[y][x - 1]))) {
    x--;
  }
  return getNumberFromFirst(x, y);
}

function getNumberFromFirst(x: number, y: number): number {
  let value = "";
  let char = lines[y][x];
  while (char !== undefined && !isNaN(parseInt(char))) {
    value += char;
    x++;
    char = lines[y][x];
  }
  return parseInt(value);
}

console.log(result);

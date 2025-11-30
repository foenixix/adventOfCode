import INPUTS from "./3.json";

const lines = INPUTS.data;

let result = 0;
for (let y = 0; y < lines.length; y++) {
  let lastCharWasDigit = false;
  for (let x = 0; x < lines.length; x++) {
    const char = lines[y][x];
    const isDigit = !isNaN(parseInt(char));
    if (!isDigit || lastCharWasDigit) {
      lastCharWasDigit = isDigit;
      continue;
    }
    lastCharWasDigit = isDigit;
    if (isValidNumber(x, y)) {
      result += getNumber(x, y);
    }
  }
}

function isValidNumber(x: number, y: number): boolean {
  let char = lines[y][x];
  while (char !== undefined && !isNaN(parseInt(char))) {
    if (hasAdjacentSymbol(x, y)) {
      return true;
    }
    x++;
    char = lines[y][x];
  }
  return false;
}

function hasAdjacentSymbol(x: number, y: number): boolean {
  const adjacentCoordinates: [number, number][] = [
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
  ];
  for (const coords of adjacentCoordinates) {
    const char = lines[coords[1]]?.[coords[0]];
    if (char === undefined || !isNaN(parseInt(char)) || char === ".") {
      continue;
    } else {
      return true;
    }
  }
  return false;
}

function getNumber(x: number, y: number): number {
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

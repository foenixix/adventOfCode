import INPUTS from "./7.json";
const start = performance.now();

const lines = INPUTS.data;

const lookUpTable: Record<string, number> = {};

function findBeams(beam: number, depth: number): number {
  if (depth === lines.length - 1) {
    return 1;
  }

  const lookUpHash = depth + "|" + beam;
  if (lookUpTable[lookUpHash] !== undefined) {
    return lookUpTable[lookUpHash];
  }

  const char = lines[depth][beam];
  let innerResult;
  if (char === ".") {
    innerResult = findBeams(beam, depth + 1);
  } else if (char === "^") {
    innerResult =
      findBeams(beam - 1, depth + 1) + findBeams(beam + 1, depth + 1);
  } else {
    throw new Error("found invalid char: " + char);
  }

  lookUpTable[lookUpHash] = innerResult;
  return innerResult;
}

const result = findBeams(lines[0].indexOf("S"), 1);
console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", result);

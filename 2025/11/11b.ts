import INPUTS from "./11.json";
const startTime = performance.now();

const directOutputs: Record<string, string[]> = {};

for (const line of INPUTS.data) {
  const index = line.indexOf(":");
  const device = line.substring(0, index);
  const outputs = line
    .substring(index + 1)
    .trim()
    .split(" ");
  directOutputs[device] = outputs;
}

function toHash(
  machine: string,
  visitedDac: boolean,
  visitedFft: boolean,
): string {
  return machine + "|" + visitedDac + "|" + visitedFft;
}

const lookUpTable: Record<string, number> = {
  [toHash("out", true, true)]: 1,
  [toHash("out", false, true)]: 0,
  [toHash("out", true, false)]: 0,
  [toHash("out", false, false)]: 0,
};

function findPathAmounts(
  start: string,
  visitedDac: boolean,
  visitedFft: boolean,
): number {
  const hash = toHash(start, visitedDac, visitedFft);
  if (lookUpTable[hash] !== undefined) {
    return lookUpTable[hash];
  }

  if (start === "dac") {
    visitedDac = true;
  } else if (start === "fft") {
    visitedFft = true;
  }
  const result = directOutputs[start].reduce(
    (acc, output) => acc + findPathAmounts(output, visitedDac, visitedFft),
    0,
  );

  lookUpTable[hash] = result;
  return result;
}

findPathAmounts("svr", false, false);

console.log(
  `full end at ${((performance.now() - startTime) / 1000).toFixed(3)}`,
);
console.log(lookUpTable[toHash("svr", false, false)]);

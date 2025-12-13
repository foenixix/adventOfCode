import INPUTS from "./11.json";
const start = performance.now();

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

const lookUpTable: Record<string, number> = { out: 1 };

function findPathAmounts(start: string): number {
  if (lookUpTable[start] !== undefined) {
    return lookUpTable[start];
  }

  const result = directOutputs[start].reduce(
    (acc, output) => acc + findPathAmounts(output),
    0,
  );

  lookUpTable[start] = result;
  return result;
}

findPathAmounts("you");

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log(lookUpTable["you"]);

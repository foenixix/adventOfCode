import INPUTS from "./19.json";

const { parts, designs } = INPUTS.value;
const towels = parts
  .split(",")
  .map((a) => a.trim())
  .sort((a, b) => b.length - a.length);
const possibilityMap: Record<string, number> = {};

function getPossibilities(design: string): number {
  if (design.length === 0) {
    return 1;
  }
  if (possibilityMap[design] !== undefined) {
    return possibilityMap[design];
  }
  let possibilities = 0;

  for (const towel of towels) {
    if (design.startsWith(towel)) {
      possibilities += getPossibilities(design.substring(towel.length));
    }
  }
  possibilityMap[design] = possibilities;
  return possibilities;
}

const result = designs.reduce((acc, design, i) => {
  console.log(i);
  return acc + getPossibilities(design);
}, 0);
console.log(result);

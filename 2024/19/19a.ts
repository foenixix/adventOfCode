import INPUTS from "./19.json";

const { parts, designs } = INPUTS.value;
const towels = parts
  .split(",")
  .map((a) => a.trim())
  .sort((a, b) => b.length - a.length);
const feasibilityMap: Record<string, boolean> = {};

function canMake(design: string): boolean {
  if (design.length === 0) {
    return true;
  }
  if (feasibilityMap[design] !== undefined) {
    return feasibilityMap[design];
  }

  for (const towel of towels) {
    if (design.startsWith(towel)) {
      if (canMake(design.substring(towel.length))) {
        feasibilityMap[design] = true;
        return true;
      }
    }
  }
  feasibilityMap[design] = false;
  return false;
}

const result = designs.filter((design, i) => {
  console.log(i);
  return canMake(design);
}).length;
console.log(result);

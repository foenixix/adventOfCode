import INPUTS from "./5.json";

let ranges = INPUTS.ranges.map((rangeString) => {
  const index = rangeString.indexOf("-");
  const min = parseInt(rangeString.substring(0, index));
  const max = parseInt(rangeString.substring(index + 1));
  return [min, max] as [number, number];
});

let collapsedRanges: [number, number][] = [];

let changed = false
do {
  collapsedRanges = []
  for (const range of ranges) {
    const wasCollapsed = addRange(collapsedRanges, range);
    if (!wasCollapsed) {
      collapsedRanges.push(range);
    }
  }
  changed = ranges.length !== collapsedRanges.length
  ranges = [...collapsedRanges]
} while (changed);

function addRange(
  accumulator: [number, number][],
  [min, max]: [number, number],
): boolean {
  for (let i = 0; i < accumulator.length; i++) {
    const collapsedRange = accumulator[i];
    if (
      (min >= collapsedRange[0] && min <= collapsedRange[1]) ||
      (max >= collapsedRange[0] && max <= collapsedRange[1]) ||
      (collapsedRange[0] >= min && collapsedRange[0] <= max) ||
      (collapsedRange[1] >= min && collapsedRange[1] <= max)
    ) {
      accumulator[i] = [
        Math.min(collapsedRange[0], min),
        Math.max(collapsedRange[1], max),
      ];
      return true;
    }
  }
  return false;
}

const result = collapsedRanges.reduce(
  (acc, range) => range[1] - range[0] + 1 + acc,
  0,
);

console.log("result", result);

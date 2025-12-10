import INPUTS from "./10.json";
const start = performance.now();

const possibleCombinationsMap: Record<string, number[][]> = {};
function getPossibleCombinations(amount: number, options: number): number[][] {
  const hash = amount + "|" + options;
  if (possibleCombinationsMap[hash] !== undefined) {
    return possibleCombinationsMap[hash];
  }

  const combinations: number[][] = [];
  if (options === 1) {
    combinations.push([amount]);
  } else if (amount === 0) {
    combinations.push(Array(options).fill(0));
  } else {
    for (let i = amount; i >= 0; i--) {
      for (const nextCombination of getPossibleCombinations(
        amount - i,
        options - 1,
      )) {
        combinations.push([i, ...nextCombination]);
      }
    }
  }
  possibleCombinationsMap[hash] = combinations;
  return combinations;
}

let result = 0;
for (let i = 0; i < INPUTS.data.length; i++) {
  const line = INPUTS.data[i];
  const spaceIndex = line.indexOf(" ");
  const lastSpaceIndex = line.lastIndexOf(" ");
  const goal = line
    .substring(lastSpaceIndex + 2, line.length - 1)
    .split(",")
    .map((a) => parseInt(a));
  const wirings = line
    .substring(spaceIndex + 1, lastSpaceIndex)
    .split(" ")
    .map((wiring) =>
      wiring
        .substring(1, wiring.length - 1)
        .split(",")
        .map((a) => parseInt(a)),
    )
    .sort((a, b) => b.length - a.length);

  const lowestPresses = getLowestPresses(
    goal,
    new Array(goal.length).fill(0),
    getNextIndex(wirings, [], goal.length),
    wirings,
    [],
  );
  console.log(
    `[${i}]: ${lowestPresses} after ${((performance.now() - start) / 1000).toFixed(3)}`,
  );
  result += lowestPresses;
}

function getLowestPresses(
  goal: number[],
  currentConfig: number[],
  index: number,
  availableWirings: number[][],
  finishedIndices: number[],
): number {
  if (index === goal.length) {
    return 0;
  }
  if (availableWirings.length === 0) {
    //I guess it's never feasible here
    return Number.MAX_SAFE_INTEGER;
  }

  const relevantWirings = availableWirings.filter((wiring) =>
    wiring.includes(index),
  );
  const nextWirings = availableWirings.filter(
    (wiring) => !wiring.includes(index),
  );
  const nextFinishedIndices = [index, ...finishedIndices];
  const nextIndex = getNextIndex(nextWirings, nextFinishedIndices, goal.length);

  if (relevantWirings.length === 0) {
    if (goal[index] === currentConfig[index]) {
      //no need to press anything at index
      return getLowestPresses(
        goal,
        currentConfig,
        nextIndex,
        nextWirings,
        nextFinishedIndices,
      );
    } else {
      return Number.MAX_SAFE_INTEGER;
    }
  }

  const currentPresses = goal[index] - currentConfig[index];

  const possibilities = getPossibleCombinations(
    currentPresses,
    relevantWirings.length,
  );
  let min = Number.MAX_SAFE_INTEGER;
  for (const possibility of possibilities) {
    const nextConfig: number[] = [...currentConfig];
    for (let i = 0; i < possibility.length; i++) {
      applyWiring(nextConfig, possibility[i], relevantWirings[i]);
    }
    const nextState = getState(goal, nextConfig);
    if (nextState === 0) {
      return currentPresses;
    } else if (nextState === 1) {
      const presses =
        currentPresses +
        getLowestPresses(
          goal,
          nextConfig,
          nextIndex,
          nextWirings,
          nextFinishedIndices,
        );
      if (presses < min) {
        min = presses;
      }
    }
  }
  return min;
}

function getNextIndex(
  availableWirings: number[][],
  disallowedIndices: number[],
  goalLength: number,
) {
  let bestIndex = 0;
  let minPossibilities = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < goalLength; i++) {
    if (disallowedIndices.includes(i)) {
      continue;
    }
    const possibilities = availableWirings.filter((wiring) =>
      wiring.includes(i),
    );
    if (possibilities.length < minPossibilities) {
      bestIndex = i;
      minPossibilities = possibilities.length;
    }
  }
  return bestIndex;
}

function applyWiring(config: number[], amount: number, wiring: number[]) {
  if (amount === 0) {
    return;
  }
  for (const i of wiring) {
    config[i] += amount;
  }
}

function getState(goal: number[], config: number[]) {
  let lower = false;
  for (let i = 0; i < goal.length; i++) {
    if (goal[i] < config[i]) {
      return -1;
    }
    if (goal[i] > config[i]) {
      lower = true;
    }
  }
  if (lower) {
    return 1;
  } else {
    return 0;
  }
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", result);

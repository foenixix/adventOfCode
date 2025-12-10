import INPUTS from "./10.json";
const start = performance.now();

let result = 0;
for (const line of INPUTS.data) {
  const spaceIndex = line.indexOf(" ");
  const lastSpaceIndex = line.lastIndexOf(" ");
  const goal = line.substring(1, spaceIndex - 1);
  const wirings = line.substring(spaceIndex + 1, lastSpaceIndex).split(" ");

  const lowestPresses = findLowestPresses(
    goalToNumber(goal),
    [0],
    wirings.map(wiringToNumber),
    0,
  );
  console.log(lowestPresses);
  result += lowestPresses;
}

function goalToNumber(goal: string): number {
  let result = 0;
  for (let i = 0; i < goal.length; i++) {
    if (goal[i] === "#") {
      result += 2 ** i;
    }
  }
  return result;
}

function wiringToNumber(wiring: string): number {
  const wiringNumbers = wiring
    .substring(1, wiring.length - 1)
    .split(",")
    .map((a) => parseInt(a));

  return wiringNumbers.reduce((acc, number) => acc + 2 ** number, 0);
}

function findLowestPresses(
  goal: number,
  currentConfigs: number[],
  availableWirings: number[],
  amount: number,
): number {
  const nextConfigs = new Set<number>();
  for (const currentConfig of currentConfigs) {
    for (const availableWiring of availableWirings) {
      const nextConfig = currentConfig ^ availableWiring;
      if (nextConfig === goal) {
        return amount + 1;
      } else {
        nextConfigs.add(nextConfig);
      }
    }
  }
  if (amount >= availableWirings.length) {
    throw new Error("no lowest presses could be found");
  } else {
    return findLowestPresses(
      goal,
      [...nextConfigs],
      availableWirings,
      amount + 1,
    );
  }
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", result);

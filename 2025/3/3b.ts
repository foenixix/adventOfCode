import INPUTS from "./3.json";

const lines = INPUTS.data;

let result = 0;
for (const line of lines) {
  const joltages = [...line];
  let joltage = "";
  let lastJoltageIndex = -1;
  for (let i = 11; i >= 0; i--) {
    const battery = joltages
      .slice(lastJoltageIndex + 1, i > 0 ? -i : undefined)
      .sort()
      .at(-1) as string;
    joltage += battery;
    lastJoltageIndex = joltages.indexOf(battery, lastJoltageIndex + 1);
  }
  console.log(joltage);
  result += parseInt(joltage);
}

console.log("result", result);

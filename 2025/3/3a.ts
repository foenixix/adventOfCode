import INPUTS from "./3.json";

const lines = INPUTS.data;

let result = 0;
for (const line of lines) {
  const joltages = [...line];
  const first = joltages.slice(0, -1).sort().at(-1) as string;
  const index = joltages.indexOf(first);
  const second = joltages
    .slice(index + 1)
    .sort()
    .at(-1) as string;
  console.log(first + second);
  result += parseInt(first + second);
}

console.log("result", result);

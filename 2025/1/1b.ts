import INPUTS from "./1.json";

const lines = INPUTS.data;

let dial = 50;
let result = 0;
console.log(dial);
for (const line of lines) {
  const amount = parseInt(line.substring(1));
  const rotation = line[0] === "L" ? 1 : -1;

  for (let i = 0; i < amount; i++) {
    dial += rotation;
    if (dial % 100 === 0) {
      result++;
    }
  }

  console.log(`${dial}, ${result}, (${line})`);
}

console.log("result", result);

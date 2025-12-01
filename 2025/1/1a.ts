import INPUTS from "./1.json";

const lines = INPUTS.data;

let dial = 50;
let result = 0;
console.log(dial);
for (const line of lines) {
  const amount = parseInt(line.substring(1));
  const rotation = (line[0] === "L" ? -1 : 1) * amount;
  dial = (dial + rotation + 10000) % 100;

  console.log(dial);
  if (dial === 0) {
    result++;
  }
}

console.log("result", result);

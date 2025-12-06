import INPUTS from "./6.json";

const lines = INPUTS.data;

const numbers = lines.slice(0, -1).map((line) =>
  line
    .split(" ")
    .map((a) => parseInt(a))
    .filter((a) => !isNaN(a)),
);
const operators = (lines.at(-1) as string)
  .split(" ")
  .filter((a) => !!a.trim())
  .map((symbol) => {
    symbol = symbol.trim();
    if (symbol === "+") {
      return (a: number, b: number) => a + b;
    } else if (symbol === "*") {
      return (a: number, b: number) => a * b;
    } else {
      throw new Error("unknown symbol: " + symbol);
    }
  });

const results = numbers[0];

for (const numberLine of numbers.slice(1)) {
  for (let i = 0; i < results.length; i++) {
    results[i] = operators[i](results[i], numberLine[i]);
  }
}

const result = results.reduce((acc, value) => acc + value, 0);
console.log("result", result);

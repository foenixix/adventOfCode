import INPUTS from "./6.json";

const lines = INPUTS.data;

const operators = [...(lines.at(-1) as string).matchAll(/(\*|\+)/g)];

let result = 0;
for (let i = 0; i < operators.length; i++) {
  const startIndex = operators[i].index;
  const predicate = getFunction(operators[i][0]);
  const digits =
    (i < operators.length - 1 ? operators[i + 1].index - 1 : lines[0].length) -
    startIndex;

  let numbers: number[] = [];
  for (let j = 0; j < digits; j++) {
    let number: string = "";
    for (const line of lines.slice(0, -1)) {
      const char = line[startIndex + j];
      if (char !== " ") {
        number += char;
      }
    }
    numbers.push(parseInt(number));
  }

  result += numbers
    .slice(1)
    .reduce((acc, value) => predicate(acc, value), numbers[0]);
}

function getFunction(symbol: string) {
  if (symbol === "+") {
    return (a: number, b: number) => a + b;
  } else if (symbol === "*") {
    return (a: number, b: number) => a * b;
  } else {
    throw new Error("unknown symbol: " + symbol);
  }
}

console.log("result", result);

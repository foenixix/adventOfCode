import INPUTS from "./1a.json";

const lines = INPUTS.data;

const values = lines.map((line) => {
  const digits = line.match(/\d/g);
  if (!digits) {
    throw new Error("Illegal State");
  }

  return parseInt(digits[0] + digits?.at(-1));
});

const result = values.reduce((prev, current) => {
  return prev + current;
}, 0);

console.log(values);
console.log(result);

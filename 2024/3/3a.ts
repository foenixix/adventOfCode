import INPUTS from "./3.json";

const muls = INPUTS.value.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
const result = [...muls].reduce(
  (accumulator, [_, left, right]) =>
    accumulator + parseInt(left) * parseInt(right),
  0,
);
console.log(result);

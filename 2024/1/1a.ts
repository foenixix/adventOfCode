import INPUTS from "./1a.json";

const sortedLeft = INPUTS.left.sort();
const sortedRight = INPUTS.right.sort();

const result = sortedLeft.reduce((prev, curr, i) => {
  return prev + Math.abs(curr - sortedRight[i]);
}, 0);

console.log(result);

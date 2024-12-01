import INPUTS from "./1a.json";

const rightMap: Record<number, number> = {};

INPUTS.right.forEach((value) => {
  if (rightMap[value] === undefined) {
    rightMap[value] = 0;
  }
  rightMap[value]++;
});

const result = INPUTS.left.reduce((prev, curr) => {
  if(rightMap[curr] === undefined){
    return prev;
  }
  return prev + curr * rightMap[curr];
}, 0);

console.log(result);

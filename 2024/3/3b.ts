import INPUTS from "./3.json";

const value = INPUTS.value;

const doIndices: number[] = [];
const doRegex = /(do|don't)\(\)/g;
while (true) {
  const match = doRegex.exec(value);
  if (!match) {
    break;
  }
  doIndices.push(match.index);
}

const subStrings: string[] = [];
let lastIndex = 0;
doIndices.forEach((index) => {
  subStrings.push(value.substring(lastIndex, index));
  lastIndex = index;
});
subStrings.push(value.substring(lastIndex));

function calculateMul(mulString: string) {
  const muls = mulString.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
  return [...muls].reduce(
    (accumulator, [_, left, right]) =>
      accumulator + parseInt(left) * parseInt(right),
    0,
  );
}

const result = subStrings
  .filter((substring, i) => i == 0 || substring.startsWith("do()"))
  .reduce((accumulator, value) => accumulator + calculateMul(value), 0);

console.log(result);

import INPUTS from "./11.json";
const start = performance.now();

const BLINKS = 40;
const originalSequence = INPUTS.value;

let list = originalSequence.split(" ").map((elem) => parseInt(elem));
for (let x = 0; x < BLINKS; x++) {
  console.log(x);
  const newList: number[] = [];
  list.forEach((value) => {
    const stringValue = value.toString();
    if (value === 0) {
      newList.push(1);
    } else if (stringValue.length % 2 === 0) {
      newList.push(parseInt(stringValue.substring(0, stringValue.length / 2)));
      newList.push(parseInt(stringValue.substring(stringValue.length / 2)));
    } else {
      newList.push(value * 2024);
    }
  });
  list = newList;
}

console.log(list.length);
console.log(performance.now() - start);

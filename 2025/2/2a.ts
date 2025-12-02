import INPUTS from "./2.json";

const ranges = INPUTS.data.split(",");

let result = 0;
for (const range of ranges) {
  const index = range.indexOf("-");
  const min = parseInt(range.substring(0, index));
  const max = parseInt(range.substring(index + 1));

  for (let i = min; i <= max; i++) {
    const numberString = i.toString();
    if (numberString.length % 2 == 1) {
      continue;
    }
    const half = numberString.length / 2;
    if (numberString.substring(0, half) === numberString.substring(half)) {
      console.log("found", numberString);
      result += i;
    }
  }
}

console.log("result", result);

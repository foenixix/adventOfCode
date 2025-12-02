import INPUTS from "./2.json";

const ranges = INPUTS.data.split(",");

let result = 0;
for (const range of ranges) {
  const index = range.indexOf("-");
  const min = parseInt(range.substring(0, index));
  const max = parseInt(range.substring(index + 1));

  for (let i = min; i <= max; i++) {
    const numberString = i.toString();
    if (isInvalidID(numberString)) {
      console.log("found", numberString);
      result += i;
    }
  }
}

function isInvalidID(numberString: string): boolean {
  for (let i = 1; i <= numberString.length / 2; i++) {
    if (numberString.length % i !== 0) {
      continue;
    }
    const substring = numberString.substring(0, i);
    if (isRepeating(numberString, substring)) {
      return true;
    }
  }
  return false;
}

function isRepeating(mainString: string, substring: string): boolean {
  for (let j = substring.length; j < mainString.length; j += substring.length) {
    if (mainString.substring(j, j + substring.length) !== substring) {
      return false;
    }
  }
  return true;
}

console.log("result", result);

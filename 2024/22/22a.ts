import INPUTS from "./22.json";

const seeds = INPUTS.value;

function xor(left: string, right: string): string {
  let result: string = "";
  const size = Math.max(left.length, right.length);
  left = left.padStart(size, "0");
  right = right.padStart(size, "0");
  for (let i = 0; i < size; i++) {
    if (left[i] === right[i]) {
      result += "0";
    } else {
      result += "1";
    }
  }
  return result;
}

function step(secretBits: string): string {
  let result = secretBits;

  result = xor(result, secretBits + "000000");
  result = result.slice(-24);

  result = xor(result, result.slice(0, -5));
  result = result.slice(-24);

  result = xor(result, result + "00000000000");
  result = result.slice(-24);
  return result;
}

let result = 0;
for (const seed of seeds) {
  let secretBits = seed.toString(2);
  for (let i = 0; i < 2000; i++) {
    secretBits = step(secretBits);
  }
  const lastSecret = parseInt(secretBits, 2);
  console.log(lastSecret);
  result += lastSecret;
}
console.log("result", result);

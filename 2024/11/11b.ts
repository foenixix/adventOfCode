import INPUTS from "./11.json";
const start = performance.now();

const BLINKS = 75;
const originalSequence = INPUTS.value;
const list = originalSequence.split(" ").map((elem) => parseInt(elem));

const map: Record<string, number> = {};

let hits = 0;

function blink(value: number, amount: number): number {
  if (amount === 0) {
    return 1;
  }
  const pos = `${value},${amount}`;
  if (map[pos]) {
    hits++;
    return map[pos];
  }

  if (value === 0) {
    const result = blink(1, amount - 1);
    map[pos] = result;
    return result;
  }
  const stringValue = value.toString();
  if (stringValue.length % 2 === 0) {
    const result =
      blink(
        parseInt(stringValue.substring(0, stringValue.length / 2)),
        amount - 1,
      ) +
      blink(
        parseInt(stringValue.substring(stringValue.length / 2)),
        amount - 1,
      );
    map[pos] = result;
    return result;
  }

  const result = blink(value * 2024, amount - 1);
  map[pos] = result;
  return result;
}

const result = list.reduce((acc, element) => acc + blink(element, BLINKS), 0);

console.log(result);
console.log(hits);
console.log(performance.now() - start);

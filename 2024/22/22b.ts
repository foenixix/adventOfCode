import INPUTS from "./22.json";
const start = performance.now();
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

const endDigits: number[][] = [];
for (const seed of seeds) {
  const ends = [seed % 10];
  let secretBits = seed.toString(2);
  for (let i = 1; i < 2000; i++) {
    secretBits = step(secretBits);
    ends.push(parseInt(secretBits, 2) % 10);
  }
  endDigits.push(ends);
}

function toCombo(
  one: number,
  two: number,
  three: number,
  four: number,
): string {
  return one + "," + two + "," + three + "," + four;
}

const comboMaps: Map<string, number>[] = [];
for (const ends of endDigits) {
  const comboMap = new Map<string, number>();
  let one = 0;
  let two = ends[1] - ends[0];
  let three = ends[2] - ends[1];
  let four = ends[3] - ends[2];

  for (let i = 4; i < ends.length; i++) {
    one = two;
    two = three;
    three = four;
    four = ends[i] - ends[i - 1];
    const combo = toCombo(one, two, three, four);
    if (!comboMap.has(combo)) {
      comboMap.set(combo, ends[i]);
    }
  }
  comboMaps.push(comboMap);
}

let highestGain = 0;
let highestCombo = "";
for (let one = -9; one < 10; one++) {
  for (let two = -9; two < 10; two++) {
    for (let three = -9; three < 10; three++) {
      for (let four = -9; four < 10; four++) {
        const combo = toCombo(one, two, three, four);
        const gain = comboMaps.reduce((acc, map) => {
          if (!map.has(combo)) {
            return acc;
          } else {
            return acc + map.get(combo)!;
          }
        }, 0);
        if (gain > highestGain) {
          highestGain = gain;
          highestCombo = combo;
        }
      }
    }
  }
}

console.log("highest gain", highestGain);
console.log("highest combo", highestCombo);
console.log(
  `solution took ${((performance.now() - start) / 1000).toFixed(2)} seconds`,
);

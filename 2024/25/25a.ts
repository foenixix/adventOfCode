import INPUTS from "./25.json";

const keyStrings = INPUTS.value;

type Heights = [number, number, number, number, number];

const locks: Heights[] = [];
const keys: Heights[] = [];

for (let i = 0; i < keyStrings.length; i += 8) {
  if (keyStrings[i][0] === "#") {
    const lock: Heights = [-1, -1, -1, -1, -1];
    for (let j = 0; j < 5; j++) {
      for (let k = 1; k < 7; k++) {
        if (keyStrings[i + k][j] === ".") {
          lock[j] = k - 1;
          break;
        }
      }
      if (lock[j] === -1) {
        throw new Error("Illegal state, bad parsing");
      }
    }
    locks.push(lock);
  } else {
    const key: Heights = [-1, -1, -1, -1, -1];
    for (let j = 0; j < 5; j++) {
      for (let k = 1; k < 7; k++) {
        if (keyStrings[i + k][j] === "#") {
          key[j] = 6 - k;
          break;
        }
      }
      if (key[j] === -1) {
        throw new Error("Illegal state, bad parsing");
      }
    }
    keys.push(key);
  }
}

function fits(key: Heights, lock: Heights): boolean {
  for (let i = 0; i < 5; i++) {
    if (key[i] + lock[i] >= 6) {
      return false;
    }
  }
  return true;
}

let counter = 0;
for (const key of keys) {
  for (const lock of locks) {
    if (fits(key, lock)) {
      counter++;
    }
  }
}
console.log(counter);

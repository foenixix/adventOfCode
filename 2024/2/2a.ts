import INPUTS from "./2.json";

function isSafe(report: number[]) {
  const increasing = report[1] > report[0];
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (diff === 0 || Math.abs(diff) > 3) {
      return false;
    }
    if (increasing && diff < 0) {
      return false;
    } else if (!increasing && diff > 0) {
      return false;
    }
  }
  return true;
}

const result = INPUTS.levels.reduce((accumulator, value, i) => {
  const list = value.split(" ").map((v) => parseInt(v));
  return accumulator + (isSafe(list) ? 1 : 0);
}, 0);

console.log(result);

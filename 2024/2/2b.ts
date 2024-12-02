import INPUTS from "./2.json";

function isSafe(report: number[], mistakeFound = false): boolean {
  const increasing = isIncreasing(report);

  function mistakeHit(at: number): boolean {
    if (mistakeFound) {
      return false;
    } else {
      return (
        isSafe([...report.slice(0, at), ...report.slice(at + 1)], true) ||
        isSafe([...report.slice(0, at + 1), ...report.slice(at + 2)], true)
      );
    }
  }

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (diff === 0 || Math.abs(diff) > 3) {
      return mistakeHit(i);
    }
    if (increasing && diff < 0) {
      return mistakeHit(i);
    } else if (!increasing && diff > 0) {
      return mistakeHit(i);
    }
  }
  return true;
}

function isIncreasing(report: number[]) {
  let increasingCount = 0;
  for (let i = 0; i < 3; i++) {
    if (report[i + 1] > report[i]) {
      increasingCount++;
    }
  }
  return increasingCount >= 2;
}

const result = INPUTS.levels.reduce((accumulator, value, i) => {
  const list = value.split(" ").map((v) => parseInt(v));
  return accumulator + (isSafe(list) ? 1 : 0);
}, 0);
console.log(result);

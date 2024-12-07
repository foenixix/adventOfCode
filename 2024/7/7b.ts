import INPUTS from "./7.json";

const equations = INPUTS.value;

function matches(
  actual: number,
  current: number,
  remainder: number[],
): boolean {
  if (remainder.length === 0) {
    return actual === current;
  }
  if (current > actual) {
    return false;
  }
  const next = remainder[0];
  const nextRemainder = remainder.slice(1);
  return (
    matches(actual, current * next, nextRemainder) ||
    matches(
      actual,
      parseInt(current.toString() + next.toString()),
      nextRemainder,
    ) ||
    matches(actual, current + next, nextRemainder)
  );
}

const result = equations.reduce((acc, eqString) => {
  const index = eqString.indexOf(":");
  const actual = parseInt(eqString.substring(0, index));
  const remainder = eqString
    .substring(index + 2)
    .split(" ")
    .map((str) => parseInt(str));
  if (matches(actual, remainder[0], remainder.slice(1))) {
    return acc + actual;
  } else {
    return acc;
  }
}, 0);

console.log(result);

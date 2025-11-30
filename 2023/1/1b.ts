import INPUTS from "./1a.json";

const lines = INPUTS.data;

const values = lines.map((line) => {
  const digits = line.match(
    /(\d|one|two|three|four|five|six|seven|eight|nine)/g,
  );
  if (!digits) {
    throw new Error("Illegal State");
  }

  return mapDigit(digits[0]) * 10 + mapDigit(digits.at(-1) as string);
});

function mapDigit(digit: string): number {
  switch (digit) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return parseInt(digit);
  }
}

const result = values.reduce((prev, current) => {
  return prev + current;
}, 0);

console.log(values);
console.log(result);

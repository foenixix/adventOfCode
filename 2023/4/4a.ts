import INPUTS from "./4.json";

const lines = INPUTS.data;

let result = 0;
for (const line of lines) {
  const winningIndex = line.indexOf(":") + 1;
  const betIndex = line.indexOf("|") + 1;
  const winningNumbers = line
    .substring(winningIndex, betIndex)
    .trim()
    .split(" ")
    .map((item) => item.trim())
    .filter((item) => !isNaN(parseInt(item)));
  const betNumbers = line
    .substring(betIndex)
    .trim()
    .split(" ")
    .map((item) => item.trim())
    .filter((item) => !isNaN(parseInt(item)));

  const wins = betNumbers.filter((betNumber) =>
    winningNumbers.includes(betNumber),
  ).length;

  console.log(wins);
  if (wins > 0) {
    result += 2 ** (wins - 1);
  }
}

console.log(result);

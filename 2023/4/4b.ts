import INPUTS from "./4.json";

const lines = INPUTS.data;

const cards = lines.map(() => 1);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

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

  for (let j = 0; j < wins; j++) {
    cards[i + j + 1] += cards[i];
  }
}

const result = cards.reduce((prev, current) => {
  return prev + current;
}, 0);

console.log(result);

import INPUTS from "./2.json";

const lines = INPUTS.data;

const result = lines.reduce((acc, line, i) => {
  return acc + linePower(line);
}, 0);

function linePower(line: string): number {
  const sets = line.split(";");
  const max: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const set of sets) {
    const colorStrings = set.split(",");
    for (const colorString of colorStrings.map((str) => str.trim())) {
      const index = colorString.indexOf(" ");
      const amount = parseInt(colorString.substring(0, index));
      const color = colorString.substring(index).trim();
      const currentMax = max[color];
      if (amount > currentMax) {
        max[color] = amount;
      }
    }
  }
  const power = max.red * max.green * max.blue;
  console.log(power);
  return power;
}

console.log(result);

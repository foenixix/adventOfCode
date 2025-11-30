import INPUTS from "./2.json";

const MAX_COLORS: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const lines = INPUTS.data;

const result = lines.reduce((acc, line, i) => {
  if (validLine(line)) {
    console.log(`game ${i + 1} was possible`);
    return acc + i + 1;
  } else {
    return acc;
  }
}, 0);

function validLine(line: string): boolean {
  const sets = line.split(";");
  for (const set of sets) {
    const colorStrings = set.split(",");
    for (const colorString of colorStrings.map((str) => str.trim())) {
      const index = colorString.indexOf(" ");
      const amount = parseInt(colorString.substring(0, index));
      const maxAmount = MAX_COLORS[colorString.substring(index).trim()];
      if (amount > maxAmount) {
        return false;
      }
    }
  }
  return true;
}

console.log(result);

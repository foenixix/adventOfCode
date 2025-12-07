import INPUTS from "./7.json";

const lines = INPUTS.data;

let beams: number[] = [lines[0].indexOf("S")];
let result = 0;

for (const line of lines.slice(1)) {
  const newBeams: number[] = [];
  for (const beam of beams) {
    if (line[beam] === ".") {
      newBeams.push(beam);
    } else if (line[beam] === "^") {
      result++;
      if (beam > 0) {
        newBeams.push(beam - 1);
      }
      if (beam < line.length - 1) {
        newBeams.push(beam + 1);
      }
    }
  }
  beams = [...new Set(newBeams)];
}

console.log("result", result);

import INPUTS from "./17.json";
import { calculateOutput } from "./util";

const computer = INPUTS.value;

const program = computer.Program;
let B = computer.B;
let C = computer.C;

function equals(left: number[], right: number[]) {
  if (left.length != right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}

function getNextValuesToTestOld(current: string): string[] {
  const list = [];
  for (let c3 = 0; c3 < 2; c3++) {
    for (let c2 = 0; c2 < 2; c2++) {
      for (let c1 = 0; c1 < 2; c1++) {
        let value = "";
        value += c3 === 0 ? "0" : "1";
        value += c2 === 0 ? "0" : "1";
        value += c1 === 0 ? "0" : "1";

        list.push(value + current);
      }
    }
  }
  return list;
}

const firstCorrectValues: string[] = [];
for (let i = 0; i < 2 ** 10; i++) {
  const value = i.toString(2).padStart(10, "0");
  const output = calculateOutput(value, program);
  if (output[0] === program[0]) {
    firstCorrectValues.push(value);
  }
}

let currentStep = 0;
let currentValues: string[] = [
  ...new Set(firstCorrectValues.map((a) => a.slice(-3))),
];
let nextValues = new Set<string>();

function step(): boolean {
  for (const value of currentValues) {
    const nextCandidates = getNextValuesToTestOld(value);
    for (const candidate of nextCandidates) {
      const output = calculateOutput(candidate, program);
      if (
        equals(
          output.slice(0, currentStep + 2),
          program.slice(0, currentStep + 2),
        )
      ) {
        if (output.length === program.length && equals(output, program)) {
          console.log("FOUND THIS SHIT", candidate);
          return true;
        }
        nextValues.add(candidate);
      }
    }
  }
  return false;
}

while (currentValues.length > 0) {
  if (step()) {
    break;
  } else {
    currentStep++;
    currentValues = [...nextValues];
    nextValues.clear();
  }
}

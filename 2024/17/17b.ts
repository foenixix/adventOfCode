import INPUTS from "./17.json";

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

function xor(left: string, right: string): string {
  let result: string = "";
  const size = Math.max(left.length, right.length);
  left = left.padStart(size, "0");
  right = right.padStart(size, "0");
  for (let i = 0; i < size; i++) {
    if (left[i] === right[i]) {
      result += "0";
    } else {
      result += "1";
    }
  }
  return result;
}

function calculateOutput(valueA: number): number[] {
  const outputs = [];

  let bitsA = valueA.toString(2);
  let bitsB = B.toString(2);
  let bitsC = C.toString(2);
  while (true) {
    bitsB = xor("111", bitsA.slice(-3));
    bitsC = bitsA.slice(0, -parseInt(bitsB, 2));
    bitsA = bitsA.slice(0, -3);
    bitsB = xor(xor("111", bitsB), bitsC);
    outputs.push(parseInt(bitsB.slice(-3), 2));
    if (bitsA.length === 0 || parseInt(bitsA, 2) === 0) {
      break;
    }
  }
  return outputs;
}

function getNextValuesToTest(current: number, correctBits: number): number[] {
  const comp1 = 2 ** (correctBits + 1);
  const comp2 = 2 ** (correctBits + 2);
  const comp3 = 2 ** (correctBits + 3);
  const list = [];
  for (let c3 = 0; c3 < 2; c3++) {
    for (let c2 = 0; c2 < 2; c2++) {
      for (let c1 = 0; c1 < 2; c1++) {
        let value = current;
        if (c1 === 0) {
          value += comp1;
        }
        if (c2 === 0) {
          value += comp2;
        }
        if (c3 === 0) {
          value += comp3;
        }
        list.push(value);
      }
    }
  }
  return list;
}

const firstCorrectValues: number[] = [];
for (let i = 0; i < 2 ** 10; i++) {
  const output = calculateOutput(i);
  if (output[0] === program[0]) {
    firstCorrectValues.push(i);
  }
}

let currentStep = 0;
let currentValues: number[] = firstCorrectValues;
let nextValues = new Set<number>();

function step(): boolean {
  for (const value of currentValues) {
    const nextCandidates = getNextValuesToTest(value, 10 + currentStep * 3);
    for (const candidate of nextCandidates) {
      const output = calculateOutput(candidate);
      if (
        equals(
          output.slice(0, currentStep + 2),
          program.slice(0, currentStep + 2),
        )
        // && output.length <= program.length
      ) {
        if (output.length === program.length && equals(output, program)) {
          console.log("FOUND THIS SHIT", value);
        }
        nextValues.add(candidate);
      }
    }
  }
  return false;
}

while (currentValues.length > 0) {
  if (currentStep === 15) {
    currentValues
      .sort((a, b) => a - b)
      .forEach((value) => {
        console.log(value, calculateOutput(value));
      });
  }
  if (step()) {
    break;
  } else {
    currentStep++;
    currentValues = [...nextValues];
    nextValues.clear();
  }
}

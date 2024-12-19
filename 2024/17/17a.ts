import INPUTS from "./17.json";

const computer = INPUTS.value;

const program = computer.Program;
let A = computer.A;
let B = computer.B;
let C = computer.C;

function getLiteral(value: number) {
  return value;
}

function getCombo(value: number) {
  if (value < 4) {
    return value;
  } else if (value === 4) {
    return A;
  } else if (value === 5) {
    return B;
  } else if (value === 6) {
    return C;
  } else {
    throw new Error("Illegal Argument passed to getCombo: " + value);
  }
}

let pointer = 0;
let skipIncrease = false;
const outputs: number[] = [];

function adv(operand: number) {
  A = A >> getCombo(operand);
}

function bxl(operand: number) {
  B = getLiteral(operand) ^ B;
}

function bst(operand: number) {
  B = getCombo(operand) % 8;
}

function jnz(operand: number) {
  if (A === 0) {
    return;
  }
  pointer = getLiteral(operand);
  skipIncrease = true;
}

function bxc(operand: number) {
  B = B ^ C;
}

function out(operand: number) {
  outputs.push(getCombo(operand) % 8);
}

function bdv(operand: number) {
  B = A >> getCombo(operand);
}

function cdv(operand: number) {
  C = A >> getCombo(operand);
}

const OPERATORS = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

while (pointer < program.length) {
  const operator = program[pointer];
  const operand = program[pointer + 1];
  OPERATORS[operator](operand);
  if (!skipIncrease) {
    pointer += 2;
  }
  skipIncrease = false;
}

console.log(outputs.join(","));

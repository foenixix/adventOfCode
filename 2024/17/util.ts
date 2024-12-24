import { skip } from "node:test";

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

function toNumber(value: string): number {
  if (value === "") {
    return 0;
  } else {
    return parseInt(value, 2);
  }
}

function getLiteral(value: number): string {
  return value.toString(2).padStart(3, "0");
}

function getCombo(value: number): string {
  if (value < 4) {
    return value.toString(2).padStart(3, "0");
  } else if (value === 4) {
    return bitsA;
  } else if (value === 5) {
    return bitsB;
  } else if (value === 6) {
    return bitsC;
  } else {
    throw new Error("Illegal Argument passed to getCombo: " + value);
  }
}

let pointer;
let skipIncrease;
let outputs: number[] = [];

function adv(operand: number) {
  const end = -toNumber(getCombo(operand));
  if (end < 0) {
    bitsA = bitsA.slice(0, end);
  }
}

function bxl(operand: number) {
  bitsB = xor(getLiteral(operand), bitsB);
}

function bst(operand: number) {
  bitsB = getCombo(operand).slice(-3);
}

function jnz(operand: number) {
  if (toNumber(bitsA) === 0) {
    return;
  }
  pointer = toNumber(getLiteral(operand));
  skipIncrease = true;
}

function bxc(operand: number) {
  bitsB = xor(bitsB, bitsC);
}

function out(operand: number) {
  outputs.push(toNumber(getCombo(operand).slice(-3)));
}

function bdv(operand: number) {
  const end = -toNumber(getCombo(operand));
  if (end < 0) {
    bitsB = bitsA.slice(0, end);
  } else {
    bitsB = bitsA;
  }
}

function cdv(operand: number) {
  const end = -toNumber(getCombo(operand));
  if (end < 0) {
    bitsC = bitsA.slice(0, end);
  } else {
    bitsC = bitsA;
  }
}

const OPERATORS = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

let bitsA: string;
let bitsB: string;
let bitsC: string;

export function calculateOutput(valueA: string, program: number[]): number[] {
  outputs = [];

  bitsA = valueA;
  bitsB = "000";
  bitsC = "000";
  pointer = 0;
  skipIncrease = false;

  while (pointer < program.length) {
    const operator = program[pointer];
    const operand = program[pointer + 1];
    OPERATORS[operator](operand);
    if (!skipIncrease) {
      pointer += 2;
    }
    skipIncrease = false;
  }
  return outputs;
}

console.log(
  calculateOutput(
    Number(265652340990875).toString(2),
    [2, 4, 1, 7, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0],
  ),
);

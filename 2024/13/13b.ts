import INPUTS from "./13.json";

const BUTTON_REGEX = /X\+(\d*), Y\+(\d*)/;
const PRIZE_REGEX = /X=(\d*), Y=(\d*)/;
const COST_A = 3;
const COST_B = 1;
const OFFSET = 10000000000000;

type Pos = [number, number];

interface Machine {
  buttonA: Pos;
  buttonB: Pos;
  prize: Pos;
}

const lines = INPUTS.value;

//parse the machines
const machines: Machine[] = [];
for (let i = 0; i < lines.length; i += 4) {
  const buttonA = lines[i].match(BUTTON_REGEX);
  const buttonB = lines[i + 1].match(BUTTON_REGEX);
  const prize = lines[i + 2].match(PRIZE_REGEX);
  if (buttonA === null || buttonB === null || prize === null) {
    throw new Error("Illegal state, bad parsing");
  }
  machines.push({
    buttonA: [parseInt(buttonA[1]), parseInt(buttonA[2])],
    buttonB: [parseInt(buttonB[1]), parseInt(buttonB[2])],
    prize: [parseInt(prize[1]) + OFFSET, parseInt(prize[2]) + OFFSET],
  });
}

function intersectLines(
  [x1, y1]: Pos,
  [x2, y2]: Pos,
  [x3, y3]: Pos,
  [x4, y4]: Pos,
) {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom == 0) {
    return null;
  }
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
    seg1: ua >= 0 && ua <= 1,
    seg2: ub >= 0 && ub <= 1,
  };
}

//calculate the response
let result = 0;
machines.forEach(({ buttonA, buttonB, prize }, i) => {
  const intersection = intersectLines(
    [prize[0] - buttonA[0], prize[1] - buttonA[1]],
    prize,
    [0, 0],
    buttonB,
  );
  if (!intersection) {
    return;
  }
  const x = intersection.x;
  const bSteps = x / buttonB[0];
  if (bSteps % 1 != 0) {
    return;
  }
  const aSteps = (prize[0] - x) / buttonA[0];
  if (aSteps % 1 != 0) {
    return;
  }
  result += aSteps * COST_A + bSteps * COST_B;
});

console.log(result);

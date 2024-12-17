import INPUTS from "./13.json";

const BUTTON_REGEX = /X\+(\d*), Y\+(\d*)/;
const PRIZE_REGEX = /X=(\d*), Y=(\d*)/;
const COST_A = 3;
const COST_B = 1;

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
    prize: [parseInt(prize[1]), parseInt(prize[2])],
  });
}

function canReachWith(
  [posX, posY]: Pos,
  [prizeX, prizeY]: Pos,
  [buttonX, buttonY]: Pos,
): boolean {
  const stepsX = (prizeX - posX) / buttonX;
  if (stepsX % 1 != 0) {
    return false;
  }
  const stepsY = (prizeY - posY) / buttonY;
  return stepsX === stepsY;
}

//calculate the response
let result = 0;
machines.forEach(({ buttonA, buttonB, prize }, i) => {
  console.log(i);
  const currentPos: Pos = [0, 0];
  let currentCost = 0;
  while (!canReachWith(currentPos, prize, buttonB)) {
    currentPos[0] += buttonA[0];
    currentPos[1] += buttonA[1];
    currentCost += COST_A;
    if (
      currentPos[0] > prize[0] ||
      currentPos[1] > prize[1] ||
      currentCost >= COST_A * 100
    ) {
      return;
    }
  }
  const steps = (prize[0] - currentPos[0]) / buttonB[0];
  currentCost += steps * COST_B;
  result += currentCost;
});

console.log(result);

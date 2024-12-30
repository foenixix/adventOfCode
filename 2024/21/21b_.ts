import INPUTS from "./21.json";
import {
  getShortestNumericRoutes,
  score,
  getShortestSubDirRoute,
} from "./util";

const codes = INPUTS.value;
const ROBOTS = 25;

const cheatMap: Record<string, number> = {};

function subDirRouteCost(route: string, steps: number): number {
  if (steps === 0) {
    return route.length + 1;
  }
  const cheatCost = cheatMap[route + "," + steps];
  if (cheatCost !== undefined) {
    return cheatCost;
  }
  const subRoutes = getShortestSubDirRoute(route);
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const subRoute of subRoutes) {
    const subDirRoutes = subRoute.split("A").slice(0, -1);
    let result = 0;
    for (const subDirRoute of subDirRoutes) {
      result += subDirRouteCost(subDirRoute, steps - 1);
    }
    if (result < lowestScore) {
      lowestScore = result;
    }
  }
  cheatMap[route + "," + steps] = lowestScore;
  return lowestScore;
}

let result = 0;
for (const code of codes) {
  let numericMoves = [""];
  let currentChar: string = "A";
  for (const char of code) {
    const routes = getShortestNumericRoutes(currentChar, char);
    const newMoves: string[] = [];
    for (const move of numericMoves) {
      for (const route of routes) {
        newMoves.push(move + route + "A");
      }
    }
    numericMoves = newMoves;
    currentChar = char;
  }

  let minScore = score(numericMoves[0]);
  for (const moveSet of numericMoves) {
    const newScore = score(moveSet);
    if (newScore < minScore) {
      minScore = newScore;
    }
  }
  numericMoves = numericMoves.filter((moveset) => score(moveset) === minScore);

  let minCost = Number.MAX_SAFE_INTEGER;
  for (const moveSet of numericMoves) {
    const subDirRoutes = moveSet.split("A").slice(0, -1);
    let cost = 0;
    for (const route of subDirRoutes) {
      cost += subDirRouteCost(route, ROBOTS);
    }
    if (cost < minCost) {
      minCost = cost;
    }
  }

  result += parseInt(code.slice(0, -1)) * minCost;
  console.log(code, numericMoves.length, minCost);
}
console.log(result);

import INPUTS from "./21.json";
import {
  getShortestNumericRoutes,
  score,
  getShortestSubDirRoute,
} from "./util";

const codes = INPUTS.value;

type Pos = [number, number];
function toPos(x: number, y: number) {
  return x + "," + y;
}

let result = 0;
// for (const code of [codes[0]]) {
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

  let goalMoves = numericMoves;
  // let goalMoves = [">^>A", ">>^A"];

  // console.log("score", score(goalMoves[0]), score(goalMoves[1]));
  let minScore = score(goalMoves[0]);
  for (const moveSet of goalMoves) {
    const newScore = score(moveSet);
    if (newScore < minScore) {
      minScore = newScore;
    }
  }
  goalMoves = goalMoves.filter((moveset) => score(moveset) === minScore);

  //here we only have dir subroutes anymore
  for (let i = 0; i < 8; i++) {
    let shortestDirMoves: string[] = [];
    for (const moveSet of goalMoves) {
      let dirMove = "";
      const subDirRoutes = moveSet.slice(0, -1).split("A");
      for (const subDirRoute of subDirRoutes) {
        dirMove += getShortestSubDirRoute(subDirRoute);
      }
      if (
        shortestDirMoves.length === 0 ||
        shortestDirMoves[0].length > dirMove.length
      ) {
        if (
          shortestDirMoves.length > 0 &&
          shortestDirMoves[0].length > dirMove.length
        ) {
          throw new Error("Illegal state: sorting didn't work");
        }
        shortestDirMoves = [dirMove];
      } else if (shortestDirMoves[0].length === dirMove.length) {
        shortestDirMoves.push(dirMove);
      }
    }
    goalMoves = shortestDirMoves;
    console.log("goals", goalMoves);
    console.log("before", i, goalMoves.length);
    let minScore = score(goalMoves[0]);
    for (const moveSet of goalMoves) {
      const newScore = score(moveSet);
      if (newScore < minScore) {
        minScore = newScore;
      }
    }
    goalMoves = goalMoves.filter((moveset) => score(moveset) === minScore);
    console.log("after", i, goalMoves.length);
  }

  result += parseInt(code.slice(0, -1)) * goalMoves[0].length;
  console.log(
    "new: ",
    code,
    numericMoves.length,
    goalMoves[0].length,
    goalMoves[0],
  );
}
console.log(result);

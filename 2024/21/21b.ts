import INPUTS from "./21.json";

const codes = INPUTS.value;

type Pos = [number, number];
function toPos(x: number, y: number) {
  return x + "," + y;
}

const numericMap = ["789", "456", "123", "#0A"];
const numericGoals = new Map<string, Pos>();
const numericObstacles = new Set<string>();
numericMap.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (char === "#") {
      numericObstacles.add(toPos(x, y));
    } else {
      numericGoals.set(char, [x, y]);
    }
  }
});

const dirMap = ["#^A", "<v>"];
const dirGoals = new Map<string, Pos>();
const dirObstacles = new Set<string>();
dirMap.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (char === "#") {
      dirObstacles.add(toPos(x, y));
    } else {
      dirGoals.set(char, [x, y]);
    }
  }
});

function step(
  map: string[],
  currentSteps: [Pos, string][],
  nextSteps: [Pos, string][],
  goal: Pos,
): string[] {
  const fullRoutes = [];
  for (const [[x, y], route] of currentSteps) {
    if (goal[0] === x && goal[1] === y) {
      fullRoutes.push(route);
      continue;
    }

    const nextCandidates: [[number, number], string][] = [];
    if (goal[0] > x) {
      nextCandidates.push([[x + 1, y], ">"]);
    }
    if (goal[0] < x) {
      nextCandidates.push([[x - 1, y], "<"]);
    }
    if (goal[1] > y) {
      nextCandidates.push([[x, y + 1], "v"]);
    }
    if (goal[1] < y) {
      nextCandidates.push([[x, y - 1], "^"]);
    }
    for (const [candidatePos, candidateDir] of nextCandidates) {
      if (map[candidatePos[1]][candidatePos[0]] !== "#") {
        nextSteps.push([candidatePos, route + candidateDir]);
      }
    }
  }
  return fullRoutes;
}

//TODO: precompute all fastest routes, should not be that hard
function findFastestRoutes(
  map: string[],
  x: number,
  y: number,
  goal: Pos,
): string[] {
  let currentSteps: [Pos, string][] = [[[x, y], ""]];
  let nextSteps: [Pos, string][] = [];

  while (currentSteps.length > 0) {
    const fullRoutes = step(map, currentSteps, nextSteps, goal);
    if (fullRoutes.length > 0) {
      return fullRoutes;
    }
    currentSteps = nextSteps;
    nextSteps = [];
  }
  throw new Error("IllegalState, no fastest routes found");
}

function score(value: string) {
  let distance = 0;
  for (let i = 0; i < value.length - 1; i++) {
    const a = dirGoals.get(value[i])!;
    const b = dirGoals.get(value[i + 1])!;
    distance += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }
  return distance;
}

let result = 0;
// for (const code of [codes[0]]) {
for (const code of codes) {
  let numericMoves = [""];
  let numericPos: Pos = numericGoals.get("A")!;
  for (const char of code) {
    const goal = numericGoals.get(char)!;
    const routes = findFastestRoutes(
      numericMap,
      numericPos[0],
      numericPos[1],
      goal,
    );
    const newMoves: string[] = [];
    for (const move of numericMoves) {
      for (const route of routes) {
        newMoves.push(move + route + "A");
      }
    }
    numericMoves = newMoves;
    numericPos = numericGoals.get(char)!;
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

  // for (let i = 0; i < 1; i++) {
  //TODO: use a modified A* for this, to not have to search all possible options
  for (let i = 0; i < 4; i++) {
    let shortestDirMoves: string[] = [];
    for (const moveSet of goalMoves) {
      let dirMoves = [""];
      let dirPos: Pos = dirGoals.get("A")!;
      for (const char of moveSet) {
        const goal = dirGoals.get(char)!;
        const routes = findFastestRoutes(dirMap, dirPos[0], dirPos[1], goal);
        const newMoves: string[] = [];
        for (const move of dirMoves) {
          for (const route of routes) {
            newMoves.push(move + route + "A");
          }
        }

        dirMoves = newMoves;
        dirPos = dirGoals.get(char)!;
      }
      if (
        shortestDirMoves.length === 0 ||
        shortestDirMoves[0].length > dirMoves[0].length
      ) {
        if (
          shortestDirMoves.length > 0 &&
          shortestDirMoves[0].length > dirMoves[0].length
        ) {
          throw new Error("Illegal state: sorting didn't work");
        }
        shortestDirMoves = dirMoves;
      } else if (shortestDirMoves[0].length === dirMoves[0].length) {
        shortestDirMoves.push(...dirMoves);
      }
    }
    goalMoves = shortestDirMoves;

    let minScore = score(goalMoves[0]);
    for (const moveSet of goalMoves) {
      const newScore = score(moveSet);
      if (newScore < minScore) {
        minScore = newScore;
      }
    }
    goalMoves = goalMoves.filter((moveset) => score(moveset) === minScore);
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

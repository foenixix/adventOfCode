type Pos = [number, number];
function toPos(x: number, y: number) {
  return x + "," + y;
}

const numericMap = ["789", "456", "123", "#0A"];
const numericGoals = new Map<string, Pos>();
numericMap.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (char !== "#") {
      numericGoals.set(char, [x, y]);
    }
  }
});

const dirMap = ["#^A", "<v>"];
const dirGoals = new Map<string, Pos>();
dirMap.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (char !== "#") {
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

export function score(value: string) {
  let distance = 0;
  for (let i = 0; i < value.length - 1; i++) {
    const a = dirGoals.get(value[i])!;
    const b = dirGoals.get(value[i + 1])!;
    distance += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }
  return distance;
}

const shortestNumericRoutes: Record<string, string[]> = {};
for (const start of numericGoals) {
  for (const end of numericGoals) {
    const shortestRoutes = findFastestRoutes(
      numericMap,
      start[1][0],
      start[1][1],
      end[1],
    );
    const minScore = Math.min(...shortestRoutes.map(score));
    const key = start[0] + "," + end[0];
    shortestNumericRoutes[key] = shortestRoutes.filter(
      (route) => score(route) === minScore,
    );
  }
}

const shortestDirRoutes: Record<string, string[]> = {};
for (const start of dirGoals) {
  for (const end of dirGoals) {
    const shortestRoutes = findFastestRoutes(
      dirMap,
      start[1][0],
      start[1][1],
      end[1],
    );
    const minScore = Math.min(...shortestRoutes.map(score));
    const key = start[0] + "," + end[0];
    shortestDirRoutes[key] = shortestRoutes.filter(
      (route) => score(route) === minScore,
    );
  }
}

const shortestSubDirRoutes: Record<string, string> = {};
const subDirRoutes = [
  ...Object.values(shortestDirRoutes).flat(),
  ...Object.values(shortestNumericRoutes).flat(),
];
// console.log(subDirRoutes);
for (const subDirRoute of subDirRoutes) {
  let moves = [""];
  let currentChar = "A";
  const moveSet = subDirRoute + "A";
  for (const char of moveSet) {
    const routes = getShortestDirRoutes(currentChar, char);
    const newMoves: string[] = [];
    for (const move of moves) {
      for (const route of routes) {
        newMoves.push(move + route + "A");
      }
    }
    moves = newMoves;
    currentChar = char;
  }

  const minScore = Math.min(...moves.map(score));
  shortestSubDirRoutes[subDirRoute] = moves.find(
    (moveset) => score(moveset) === minScore,
  )!;
}
// console.log(JSON.stringify(shortestSubDirRoutes, null, 2));

export function getShortestNumericRoutes(from: string, to: string): string[] {
  const result = shortestNumericRoutes[from + "," + to];
  if (result === undefined) {
    throw new Error(
      `Illegal argument, couldnt find numeric route between ${from} and ${to}`,
    );
  }
  return result;
}

export function getShortestDirRoutes(from: string, to: string): string[] {
  const result = shortestDirRoutes[from + "," + to];
  if (result === undefined) {
    throw new Error(
      `Illegal argument, couldnt find dir route between ${from} and ${to}`,
    );
  }
  return result;
}

export function getShortestSubDirRoute(route: string): string {
  const result = shortestSubDirRoutes[route];
  if (result === undefined) {
    throw new Error(`Illegal argument, couldnt find subdir route for ${route}`);
  }
  return result;
}

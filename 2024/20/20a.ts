import INPUTS from "./20.json";

const map = INPUTS.value;
const width = map[0].length;
const height = map.length;

let start: [number, number] = [0, 0];
let end: [number, number] = [0, 0];

map.forEach((row, y) => {
  const startIndex = row.indexOf("S");
  if (startIndex >= 0) {
    start = [startIndex, y];
  }

  const endIndex = row.indexOf("E");
  if (endIndex >= 0) {
    end = [endIndex, y];
  }
});

function toPos(x: number, y: number): string {
  return x + "," + y;
}
//find the fastest way to get there
function getFirstInfo() {
  let currentSteps = 0;
  let currentVisits: [[number, number], string[]][] = [
    [start, [toPos(start[0], start[1])]],
  ];
  const nextVisits = new Map<string, string[]>();
  const visitedSet = new Set<string>();
  const reachMap = new Map<string, number>();

  function step(): boolean {
    for (const [[x, y], route] of currentVisits) {
      const pos = toPos(x, y);
      visitedSet.add(pos);
      if (x === end[0] && y === end[1]) {
        for (let i = 0; i < route.length; i++) {
          reachMap.set(route[route.length - 1 - i], i);
        }
        return true;
      }

      const nextCandidates: [number, number][] = [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y],
      ];
      for (const candidate of nextCandidates) {
        if (
          candidate[0] < 1 ||
          candidate[1] < 1 ||
          candidate[0] >= width - 1 ||
          candidate[1] >= height - 1
        ) {
          continue;
        }
        const pos = toPos(candidate[0], candidate[1]);
        if (map[candidate[1]][candidate[0]] !== "#" && !visitedSet.has(pos)) {
          nextVisits.set(pos, [...route, pos]);
        }
      }
    }
    return false;
  }
  while (currentVisits.length > 0) {
    if (step()) {
      return { steps: currentSteps, reachMap, visitedSet };
    } else {
      currentVisits = [...nextVisits.entries()].map(([visit, route]) => {
        const [stringX, stringY] = visit.split(",");
        return [[parseInt(stringX), parseInt(stringY)], route];
      });
      nextVisits.clear();
    }
    currentSteps++;
  }
  throw new Error("Illegal state, should've found steps in while loop");
}

const { steps: maxSteps, reachMap: originalReachMap } = getFirstInfo();
console.log("max steps", maxSteps);

let currentSteps = 0;
let currentVisits: [[number, number], boolean, string[]][] = [
  [start, false, []],
];
let nextVisits: [[number, number], boolean, string[]][] = [];
let routes = 0;

function step() {
  for (const [[x, y], cheated, route] of currentVisits) {
    const nextRoute = [...route, toPos(x, y)];
    if (x === end[0] && y === end[1]) {
      routes++;
    }

    const nextCandidates: [number, number][] = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];
    for (const candidate of nextCandidates) {
      if (
        candidate[0] < 1 ||
        candidate[1] < 1 ||
        candidate[0] >= width - 1 ||
        candidate[1] >= height - 1 ||
        route.includes(toPos(candidate[0], candidate[1]))
      ) {
        continue;
      }

      if (cheated) {
        if (map[candidate[1]][candidate[0]] !== "#") {
          nextVisits.push([candidate, true, nextRoute]);
        }
      } else {
        const cheating = map[candidate[1]][candidate[0]] === "#";
        nextVisits.push([candidate, cheating, nextRoute]);
      }
    }
  }
}
while (currentVisits.length > 0 && currentSteps < maxSteps) {
  console.log(i, currentVisits.length);
  step();
  currentVisits = nextVisits;
  nextVisits = [];
  currentSteps++;
}
console.log(routes);

// function toVisit(x: number, y: number, cheated: boolean, steps: number) {
//   return `${x},${y},${cheated},${steps}`;
// }
// const reachMap = new Map<string, string[]>();
// //TODO: populate the reachmap with the originalReachMap

// function getRoutes(
//   x: number,
//   y: number,
//   cheated: boolean,
//   steps: number,
//   route: string[],
// ): string[] {
//   if (steps >= maxSteps) {
//     return [];
//   } else if (Math.abs(end[0] - x) + Math.abs(end[1] - y) >= maxSteps - steps) {
//     return [];
//   }
//   const nextRoute = [...route, toPos(x, y)];
//   if (x === end[0] && y === end[1]) {
//     console.log("route", nextRoute);
//     return nextRoute;
//   }
//   const visit = toVisit(x, y, cheated, steps);
//   // if (reachMap.has(visit)) {
//   //   return reachMap.get(visit)!;
//   // }

//   let routes = [];
//   const nextCandidates: [number, number][] = [
//     [x, y + 1],
//     [x, y - 1],
//     [x + 1, y],
//     [x - 1, y],
//   ];
//   for (const candidate of nextCandidates) {
//     if (
//       candidate[0] < 1 ||
//       candidate[1] < 1 ||
//       candidate[0] >= width - 1 ||
//       candidate[1] >= height - 1 ||
//       route.includes(toPos(candidate[0], candidate[1]))
//     ) {
//       continue;
//     }
//     if (cheated) {
//       if (map[candidate[1]][candidate[0]] !== "#") {
//         routes.push(
//           ...getRoutes(candidate[0], candidate[1], true, steps + 1, nextRoute),
//         );
//       }
//     } else {
//       const cheating = map[candidate[1]][candidate[0]] === "#";
//       routes.push(
//         ...getRoutes(
//           candidate[0],
//           candidate[1],
//           cheating,
//           steps + 1,
//           nextRoute,
//         ),
//       );
//     }
//   }
//   reachMap.set(visit, routes);
//   return count;
// }

// console.log(countRoutes(start[0], start[1], false, 0, []));
// debugger;

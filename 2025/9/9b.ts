import INPUTS from "./9.json";
const start = performance.now();

const corners = INPUTS.data.map((coords) =>
  coords.split(",").map((a) => parseInt(a)),
);
let outsideCorners: [number, number][] = [];

let highestArea = 0;

//assume that the winding-order is clock-wise, just because the example is
for (let i = 0; i < corners.length; i++) {
  const prevCorner = i === 0 ? (corners.at(-1) as number[]) : corners[i - 1];
  const currentCorner = corners[i];
  const nextCorner = i + 1 === corners.length ? corners[0] : corners[i + 1];

  const prevDown = prevCorner[1] < currentCorner[1];
  const prevRight = currentCorner[0] > prevCorner[0];
  if (nextCorner[0] > currentCorner[0]) {
    //going right
    for (
      let i = currentCorner[0] + (prevDown ? 1 : 0);
      i < nextCorner[0];
      i++
    ) {
      outsideCorners.push([i, currentCorner[1] - 1]);
    }
  } else if (nextCorner[0] < currentCorner[0]) {
    //going left
    for (
      let i = nextCorner[0] + (prevDown ? 0 : 1);
      i < currentCorner[0];
      i++
    ) {
      outsideCorners.push([i, currentCorner[1] + 1]);
    }
  } else if (nextCorner[1] > currentCorner[1]) {
    //going down
    for (
      let i = currentCorner[1] + (prevRight ? 1 : 0);
      i < nextCorner[1];
      i++
    ) {
      outsideCorners.push([currentCorner[0] + 1, i]);
    }
  } else if (nextCorner[1] < currentCorner[1]) {
    //going up
    for (
      let i = nextCorner[1] + (prevRight ? 0 : 1);
      i < currentCorner[1];
      i++
    ) {
      outsideCorners.push([currentCorner[0] - 1, i]);
    }
  } else {
    throw new Error("going nowhere");
  }
}

outsideCorners = [...new Set(outsideCorners)];

for (let i = 0; i < corners.length; i++) {
  for (let j = i + 1; j < corners.length; j++) {
    if (corners[i][0] === corners[j][0] || corners[i][1] === corners[j][0]) {
      continue;
    }
    const area =
      (Math.abs(corners[i][0] - corners[j][0]) + 1) *
      (Math.abs(corners[i][1] - corners[j][1]) + 1);
    if (area > highestArea && !hasOutsideInside(corners[i], corners[j])) {
      highestArea = area;
    }
  }
}

function hasOutsideInside([x1, y1]: number[], [x2, y2]: number[]) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  for (const outside of outsideCorners) {
    if (
      outside[0] >= minX &&
      outside[0] <= maxX &&
      outside[1] >= minY &&
      outside[1] <= maxY
    ) {
      return true;
    }
  }
  return false;
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", highestArea);

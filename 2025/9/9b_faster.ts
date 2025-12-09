import INPUTS from "./9.json";
const start = performance.now();

const corners = INPUTS.data.map((coords) =>
  coords.split(",").map((a) => parseInt(a)),
);

const verticalLines: [number, number, number][] = [];
const horizontalLines: [number, number, number][] = [];

//assume that the winding-order is clock-wise, just because the example is
for (let i = 0; i < corners.length; i++) {
  const currentCorner = corners[i];
  const nextCorner = i + 1 === corners.length ? corners[0] : corners[i + 1];

  if (nextCorner[0] !== currentCorner[0]) {
    //horizontal
    horizontalLines.push([
      nextCorner[1],
      Math.min(nextCorner[0], currentCorner[0]),
      Math.max(nextCorner[0], currentCorner[0]),
    ]);
  } else if (nextCorner[1] !== currentCorner[1]) {
    //vertical
    verticalLines.push([
      nextCorner[0],
      Math.min(nextCorner[1], currentCorner[1]),
      Math.max(nextCorner[1], currentCorner[1]),
    ]);
  } else {
    throw new Error("going nowhere");
  }
}

let highestArea = 0;
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

  for (const [height, min, max] of horizontalLines) {
    if (height <= minY || height >= maxY) {
      //not on the correct height
      continue;
    }

    if ((min > minX && min < maxX) || (max > minX && max < maxX)) {
      //at least one of the corners of the line is inside of the rectangle
      return true;
    }

    if (min <= minX && max >= maxX) {
      //the line goes fully through the rectangle
      return true;
    }
  }

  for (const [column, min, max] of verticalLines) {
    if (column <= minX || column >= maxX) {
      //not on the correct height
      continue;
    }

    if ((min > minY && min < maxY) || (max > minY && max < maxY)) {
      //at least one of the corners of the line is inside of the rectangle
      return true;
    }

    if (min <= minY && max >= maxY) {
      //the line goes fully through the rectangle
      return true;
    }
  }

  return false;
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", highestArea);

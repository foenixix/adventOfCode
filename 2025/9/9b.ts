import INPUTS from "./9.json";
const start = performance.now();

const corners = INPUTS.data.map((coords) =>
  coords.split(",").map((a) => parseInt(a)),
);
const outsideCorners: [number, number][] = [];

//This only works for my solution
for(let i=1673; i<94601; i++){
  outsideCorners.push([i, 50002])
  outsideCorners.push([i, 48786])
}


let highestArea = 0;

//assume that the winding-order is clock-wise, just because the example is
for (let i = 0; i < corners.length; i++) {
  const prevCorner = i === 0 ? (corners.at(-1) as number[]) : corners[i - 1];
  const currentCorner = corners[i];
  const nextCorner = i + 1 === corners.length ? corners[0] : corners[i + 1];

  if (nextCorner[0] > currentCorner[0]) {
    //going right
    if (currentCorner[1] > prevCorner[1]) {
      //prev went down
      outsideCorners.push([currentCorner[0] + 1, currentCorner[1] - 1]);
    } else if (currentCorner[1] < prevCorner[1]) {
      //prev went up
      outsideCorners.push(
        [currentCorner[0] - 1, currentCorner[1]],
        [currentCorner[0] - 1, currentCorner[1] - 1],
        [currentCorner[0], currentCorner[1] - 1],
      );
    } else {
      throw new Error(
        "now going horizontal but previous didn't go vertical, I made a wrong assumption",
      );
    }
  } else if (nextCorner[0] < currentCorner[0]) {
    //going left
    if (currentCorner[1] > prevCorner[1]) {
      //prev went down
      outsideCorners.push(
        [currentCorner[0] + 1, currentCorner[1]],
        [currentCorner[0] + 1, currentCorner[1] + 1],
        [currentCorner[0], currentCorner[1] + 1],
      );
    } else if (currentCorner[1] < prevCorner[1]) {
      //prev went up
      outsideCorners.push([currentCorner[0] - 1, currentCorner[1] + 1]);
    } else {
      throw new Error(
        "now going horizontal but previous didn't go vertical, I made a wrong assumption",
      );
    }
  } else if (nextCorner[1] > currentCorner[1]) {
    //going down
    if (currentCorner[0] > prevCorner[0]) {
      //prev went right
      outsideCorners.push(
        [currentCorner[0], currentCorner[1] - 1],
        [currentCorner[0] + 1, currentCorner[1] - 1],
        [currentCorner[0] + 1, currentCorner[1]],
      );
    } else if (currentCorner[0] < prevCorner[0]) {
      //prev went left
      outsideCorners.push([currentCorner[0] + 1, currentCorner[1] + 1]);
    } else {
      throw new Error(
        "now going vertical but previous didn't go horizontal, I made a wrong assumption",
      );
    }
  } else if (nextCorner[1] < currentCorner[1]) {
    //going up
    if (currentCorner[0] > prevCorner[0]) {
      //prev went right
      outsideCorners.push([currentCorner[0] - 1, currentCorner[1] - 1]);
    } else if (currentCorner[0] < prevCorner[0]) {
      //prev went left
      outsideCorners.push(
        [currentCorner[0] - 1, currentCorner[1]],
        [currentCorner[0] - 1, currentCorner[1] + 1],
        [currentCorner[0], currentCorner[1] + 1],
      );
    } else {
      throw new Error(
        "now going vertical but previous didn't go horizontal, I made a wrong assumption",
      );
    }
  } else {
    throw new Error("going nowhere");
  }
}

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
      // console.log(
      //   `(${x1}, ${y1})-(${x2},${y2}) has (${outside[0]}, ${outside[1]}) inside`,
      // );
      return true;
    }
  }
  return false;
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", highestArea);



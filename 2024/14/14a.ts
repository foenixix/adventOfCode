import INPUTS from "./14.json";

const ROBOT_REGEX = /p=(\d*),(\d*) v=(-?\d*),(-?\d*)/;
const { width, height, robots: robotStrings } = INPUTS.value;

type Pos = [number, number];

interface Robot {
  pos: Pos;
  velocity: Pos;
}

//parse robots
const robots: Robot[] = robotStrings.map((robotString) => {
  const match = robotString.match(ROBOT_REGEX);
  if (!match) {
    throw new Error("Illegal state, bad parsing");
  }
  return {
    pos: [parseInt(match[1]), parseInt(match[2])],
    velocity: [parseInt(match[3]), parseInt(match[4])],
  };
});

//let time pass
for (let time = 0; time < 100; time++) {
  robots.forEach(({ pos, velocity }, i) => {
    pos[0] += velocity[0];
    pos[1] += velocity[1];
    if (pos[0] >= width) {
      pos[0] %= width;
    } else if (pos[0] < 0) {
      pos[0] += width;
    }
    if (pos[1] >= height) {
      pos[1] %= height;
    } else if (pos[1] < 0) {
      pos[1] += height;
    }
  });
}

// count quadrants
const quadrants = [0, 0, 0, 0];
robots.forEach(({ pos }) => {
  if (pos[0] === (width - 1) / 2 || pos[1] === (height - 1) / 2) {
    return;
  }
  if (pos[0] < width / 2) {
    if (pos[1] < height / 2) {
      quadrants[0]++;
    } else {
      quadrants[1]++;
    }
  } else {
    if (pos[1] < height / 2) {
      quadrants[2]++;
    } else {
      quadrants[3]++;
    }
  }
});

const result = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3];
console.log(result);

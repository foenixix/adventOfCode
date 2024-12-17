import INPUTS from "./14.json";
import { Jimp } from "Jimp";

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

function log(i: number) {
  const positions = new Set<string>();
  for (const { pos } of robots) {
    const posString = pos.join(",");
    if (positions.has(posString)) {
      //thanks reddit for this trick, otherwise I'd have gone crazy
      return;
    }
    positions.add(posString);
  }

  const image = new Jimp({ width, height, color: 0xffffffff });
  robots.forEach(({ pos }) => {
    const y = pos[1];
    const x = pos[0];
    image.setPixelColor(0x000000, x, y);
  });

  image.write(`2024/14/out/${i}.png`);
}

//let time pass
for (let time = 0; time < 10000; time++) {
  log(time);
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

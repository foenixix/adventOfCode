import INPUTS from "./15.json";

const { map, moves } = INPUTS.value;

const width = map[0].length;
const height = map.length;

const walls = new Set<string>();
const boxes = new Set<string>();
let pos: [number, number] = [0, 0];

function toPos(x: number, y: number) {
  return `${x},${y}`;
}

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const elem = map[y][x];
    if (elem === "#") {
      walls.add(toPos(x * 2, y));
      walls.add(toPos(x * 2 + 1, y));
    } else if (elem === "O") {
      boxes.add(toPos(x * 2, y));
    } else if (elem === "@") {
      pos = [x * 2, y];
    }
  }
}

function isWall(x: number, y: number) {
  return (
    x < 2 ||
    x >= width * 2 - 2 ||
    y < 1 ||
    y >= height - 1 ||
    walls.has(toPos(x, y))
  );
}

function isBox(x: number, y: number) {
  return boxes.has(toPos(x, y));
}

function pushLeft(boxX: number, boxY: number): boolean {
  if (isWall(boxX - 1, boxY)) {
    return false;
  } else if (!isBox(boxX - 2, boxY) || pushLeft(boxX - 2, boxY)) {
    boxes.delete(toPos(boxX, boxY));
    boxes.add(toPos(boxX - 1, boxY));
    return true;
  } else {
    return false;
  }
}

function moveRobotLeft() {
  const newX = pos[0] - 1;
  const newY = pos[1];
  if (isWall(newX, newY)) {
    return;
  }

  if (isBox(newX - 1, newY)) {
    if (pushLeft(newX - 1, newY)) {
      pos = [newX, newY];
    }
  } else {
    pos = [newX, newY];
  }
}

function pushRight(boxX: number, boxY: number): boolean {
  if (isWall(boxX + 2, boxY)) {
    return false;
  } else if (!isBox(boxX + 2, boxY) || pushRight(boxX + 2, boxY)) {
    boxes.delete(toPos(boxX, boxY));
    boxes.add(toPos(boxX + 1, boxY));
    return true;
  } else {
    return false;
  }
}

function moveRobotRight() {
  const newX = pos[0] + 1;
  const newY = pos[1];
  if (isWall(newX, newY)) {
    return;
  }

  if (isBox(newX, newY)) {
    if (pushRight(newX, newY)) {
      pos = [newX, newY];
    }
  } else {
    pos = [newX, newY];
  }
}

function pushUp(boxX: number, boxY: number) {
  if (isBox(boxX - 1, boxY - 1)) {
    pushUp(boxX - 1, boxY - 1);
  }
  if (isBox(boxX, boxY - 1)) {
    pushUp(boxX, boxY - 1);
  }
  if (isBox(boxX + 1, boxY - 1)) {
    pushUp(boxX + 1, boxY - 1);
  }
  boxes.delete(toPos(boxX, boxY));
  boxes.add(toPos(boxX, boxY - 1));
}

function canPushUp(boxX: number, boxY: number): boolean {
  if (isWall(boxX, boxY - 1) || isWall(boxX + 1, boxY - 1)) {
    return false;
  }

  return (
    (!isBox(boxX - 1, boxY - 1) || canPushUp(boxX - 1, boxY - 1)) &&
    (!isBox(boxX, boxY - 1) || canPushUp(boxX, boxY - 1)) &&
    (!isBox(boxX + 1, boxY - 1) || canPushUp(boxX + 1, boxY - 1))
  );
}

function moveRobotUp() {
  const newX = pos[0];
  const newY = pos[1] - 1;
  if (isWall(newX, newY)) {
    return;
  }

  if (isBox(newX, newY)) {
    if (canPushUp(newX, newY)) {
      pushUp(newX, newY);
      pos = [newX, newY];
    }
  } else if (isBox(newX - 1, newY)) {
    if (canPushUp(newX - 1, newY)) {
      pushUp(newX - 1, newY);
      pos = [newX, newY];
    }
  } else {
    pos = [newX, newY];
  }
}

function pushDown(boxX: number, boxY: number) {
  if (isBox(boxX - 1, boxY + 1)) {
    pushDown(boxX - 1, boxY + 1);
  }
  if (isBox(boxX, boxY + 1)) {
    pushDown(boxX, boxY + 1);
  }
  if (isBox(boxX + 1, boxY + 1)) {
    pushDown(boxX + 1, boxY + 1);
  }
  boxes.delete(toPos(boxX, boxY));
  boxes.add(toPos(boxX, boxY + 1));
}

function canPushDown(boxX: number, boxY: number): boolean {
  if (isWall(boxX, boxY + 1) || isWall(boxX + 1, boxY + 1)) {
    return false;
  }

  return (
    (!isBox(boxX - 1, boxY + 1) || canPushDown(boxX - 1, boxY + 1)) &&
    (!isBox(boxX, boxY + 1) || canPushDown(boxX, boxY + 1)) &&
    (!isBox(boxX + 1, boxY + 1) || canPushDown(boxX + 1, boxY + 1))
  );
}

function moveRobotDown() {
  const newX = pos[0];
  const newY = pos[1] + 1;
  if (isWall(newX, newY)) {
    return;
  }

  if (isBox(newX, newY)) {
    if (canPushDown(newX, newY)) {
      pushDown(newX, newY);
      pos = [newX, newY];
    }
  } else if (isBox(newX - 1, newY)) {
    if (canPushDown(newX - 1, newY)) {
      pushDown(newX - 1, newY);
      pos = [newX, newY];
    }
  } else {
    pos = [newX, newY];
  }
}

function log() {
  console.log("#".repeat(width * 2));
  for (let y = 1; y < height - 1; y++) {
    let line = "##";
    for (let x = 2; x < width * 2 - 2; x++) {
      if (isWall(x, y)) {
        line += "#";
      } else if (isBox(x, y)) {
        line += "[]";
        x++;
      } else if (pos[0] === x && pos[1] === y) {
        line += "@";
      } else {
        line += ".";
      }
    }
    console.log(line + "##" + y);
  }
  console.log("#".repeat(width * 2));
}

for (const move of moves) {
  // log();
  if (move === "<") {
    moveRobotLeft();
  } else if (move === "^") {
    moveRobotUp();
  } else if (move === ">") {
    moveRobotRight();
  } else if (move === "v") {
    moveRobotDown();
  } else {
    throw new Error("Illegal state, bad move parsing");
  }
  // console.log("");
}

log();

const result = [...boxes]
  .map((box) => {
    const [x, y] = box.split(",");
    return parseInt(y) * 100 + parseInt(x);
  })
  .reduce((acc, value) => acc + value, 0);

console.log(result);

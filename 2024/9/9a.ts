import INPUTS from "./9.json";

const compressed = INPUTS.value;
const disk: number[] = [];

let nextId: number = 0;

for (let i = 0; i < compressed.length; i++) {
  const length = parseInt(compressed[i]);
  if (i % 2 == 0) {
    //file
    const id = nextId++;
    for (let j = 0; j < length; j++) {
      disk.push(id);
    }
  } else {
    //empty
    for (let j = 0; j < length; j++) {
      disk.push(-1);
    }
  }
}

while (true) {
  const firstEmtpyIndex = disk.indexOf(-1);
  const lastNumberIndex = disk.findLastIndex((number) => number !== -1);
  if (lastNumberIndex < firstEmtpyIndex) {
    break;
  }
  disk[firstEmtpyIndex] = disk[lastNumberIndex];
  disk[lastNumberIndex] = -1;
}

const result = disk
  .filter((id) => id !== -1)
  .reduce((acc, id, i) => acc + id * i, 0);

console.log(result);

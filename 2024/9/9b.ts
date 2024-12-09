const startTime = performance.now();
import INPUTS from "./9.json";

const compressed = INPUTS.value;
const disk: number[] = [];
const idToPlaceAndLength: Record<number, [number, number]> = {};

let nextId: number = 0;

for (let i = 0; i < compressed.length; i++) {
  const length = parseInt(compressed[i]);
  if (i % 2 == 0) {
    //file
    const id = nextId++;
    idToPlaceAndLength[id] = [disk.length, length];
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

for (let currentId = nextId - 1; currentId >= 0; currentId--) {
  const [fileStart, neededSpace] = idToPlaceAndLength[currentId];

  let firstEmtpyIndex = disk.indexOf(-1);
  let nextUsedIndex = disk.findIndex(
    (number, i) => i > firstEmtpyIndex && number !== -1,
  );
  let availableSpace = nextUsedIndex - firstEmtpyIndex;
  while (
    firstEmtpyIndex > -1 &&
    firstEmtpyIndex < fileStart &&
    availableSpace < neededSpace
  ) {
    firstEmtpyIndex = disk.indexOf(-1, nextUsedIndex);
    nextUsedIndex = disk.findIndex(
      (number, i) => i > firstEmtpyIndex && number !== -1,
    );
    availableSpace = nextUsedIndex - firstEmtpyIndex;
  }
  if (firstEmtpyIndex > -1 && firstEmtpyIndex < fileStart) {
    for (let i = 0; i < neededSpace; i++) {
      disk[firstEmtpyIndex + i] = currentId;
      disk[fileStart + i] = -1;
    }
  }
}

// console.log(disk.join(","));

const result = disk.reduce((acc, id, i) => {
  if (id === -1) {
    return acc;
  } else {
    return acc + id * i;
  }
}, 0);

console.log(result);
console.log(`result took ${(performance.now() - startTime) / 1000} seconds`);

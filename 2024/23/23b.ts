import INPUTS from "./23.json";
//had to wait for +-3 hours to get the right result (wasn't done yet but longest one was already found)

const start = performance.now();
const links = INPUTS.test;

const connectionMap: Record<string, string[]> = {};
for (const link of links) {
  const left = link.slice(0, 2);
  const right = link.slice(-2);
  if (connectionMap[left] === undefined) {
    connectionMap[left] = [];
  }
  if (connectionMap[right] === undefined) {
    connectionMap[right] = [];
  }
  connectionMap[left].push(right);
  connectionMap[right].push(left);
}

let largestParty: string[] = [];
let largetsPartySize: number = 0;

function visit([pc, ...others]: string[]) {
  let extra = false;
  for (const other of connectionMap[pc]) {
    if (others.includes(other)) {
      continue;
    }
    const otherConnections = connectionMap[other];
    if (
      others.find((existingOther) => !otherConnections.includes(existingOther))
    ) {
      continue;
    }
    extra = true;
    visit([pc, ...others, other]);
  }
  if (!extra) {
    if (others.length + 1 > largetsPartySize) {
      largetsPartySize = others.length + 1;
      largestParty = [pc, ...others];
    }
  }
}

for (const pc of Object.keys(connectionMap)) {
  console.log(
    pc,
    "subTime: ",
    ((performance.now() - start) / 1000).toFixed(2),
    largestParty.sort().join(","),
  );

  visit([pc]);
}

console.log(largetsPartySize);
console.log(largestParty);
console.log(largestParty.sort().join(","));
console.log("total time: ", ((performance.now() - start) / 1000).toFixed(2));
debugger;

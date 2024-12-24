import INPUTS from "./23.json";

const links = INPUTS.value;

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

function toTriplet(one: string, two: string, three: string) {
  return [one, two, three].sort().join("-");
}

const triplets = new Set<string>();
for (const [one, oneConnections] of Object.entries(connectionMap)) {
  for (const two of oneConnections) {
    for (const three of connectionMap[two]) {
      if (connectionMap[three].includes(one)) {
        if (one[0] === "t" || two[0] === "t" || three[0] === "t") {
          triplets.add(toTriplet(one, two, three));
        }
      }
    }
  }
}

console.log(triplets.size);
console.log([...triplets].sort());

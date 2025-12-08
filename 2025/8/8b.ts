import INPUTS from "./8.json";
const start = performance.now();

type Coord = [number, number, number];
type Connection = {
  distance: number;
  connectedIndices: [number, number];
};

const lines = INPUTS.data;

const coords: Coord[] = lines.map(
  (line) => line.split(",").map((a) => parseInt(a)) as Coord,
);

const connections: Connection[] = [];
for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    connections.push({
      distance: getDistance(coords[i], coords[j]),
      connectedIndices: [i, j],
    });
  }
}
function getDistance(coordA: Coord, coordB: Coord) {
  return (
    (coordA[0] - coordB[0]) ** 2 +
    (coordA[1] - coordB[1]) ** 2 +
    (coordA[2] - coordB[2]) ** 2
  );
}

connections.sort((a, b) => a.distance - b.distance);

const circuits: number[][] = [];
let lastConnectedIndices: [number, number] | null = null;

for (const { connectedIndices } of connections) {
  const circuitAIndex = circuits.findIndex((circuit) =>
    circuit.includes(connectedIndices[0]),
  );
  const circuitBIndex = circuits.findIndex((circuit) =>
    circuit.includes(connectedIndices[1]),
  );
  if (circuitAIndex >= 0 && circuitBIndex >= 0) {
    if (circuitAIndex === circuitBIndex) {
      continue;
    }
    circuits[circuitAIndex].push(...circuits[circuitBIndex]);
    circuits.splice(circuitBIndex, 1);
  } else if (circuitAIndex >= 0) {
    circuits[circuitAIndex].push(connectedIndices[1]);
  } else if (circuitBIndex >= 0) {
    circuits[circuitBIndex].push(connectedIndices[0]);
  } else {
    circuits.push([...connectedIndices]);
  }
  if (circuits[0].length === coords.length) {
    lastConnectedIndices = connectedIndices;
    break;
  }
}

if (lastConnectedIndices === null) {
  throw new Error("the loop finished without making a last connection");
}

const result =
  coords[lastConnectedIndices[0]][0] * coords[lastConnectedIndices[1]][0];
console.log("result", result);
console.log(`ended after ${((performance.now() - start) / 1000).toFixed(3)}s`);

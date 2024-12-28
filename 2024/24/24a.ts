import INPUTS from "./24.json";

type Operation = "OR" | "XOR" | "AND";
interface ParsedConnection {
  operation: Operation;
  inputs: [string, string];
  output: string;
}
const INITIAL_REGEX = /(.*):(.*)/;
const CONNECTION_REGEX = /(.*) (.*) (.*) -> (.*)/;

const { initial, connections } = INPUTS.value;

const wireValues: Record<string, number> = {};
initial.forEach((initialString) => {
  const [_, wire, value] = initialString.match(INITIAL_REGEX)!;
  wireValues[wire] = parseInt(value);
});
const connectionList: ParsedConnection[] = connections.map(
  (connectionString) => {
    const [_, input1, operation, input2, output] =
      connectionString.match(CONNECTION_REGEX)!;
    return {
      operation: operation as Operation,
      inputs: [input1, input2] as [string, string],
      output,
    };
  },
);

function apply(operation: Operation, left: number, right: number): number {
  if (operation === "AND") {
    return left & right;
  } else if (operation === "OR") {
    return left | right;
  } else {
    return left ^ right;
  }
}

let connectionsToResolve = [...connectionList];
while (connectionsToResolve.length > 0) {
  for (const { inputs, operation, output } of connectionsToResolve) {
    if (
      wireValues[inputs[0]] !== undefined &&
      wireValues[inputs[1]] !== undefined
    ) {
      wireValues[output] = apply(
        operation,
        wireValues[inputs[0]],
        wireValues[inputs[1]],
      );
    }
  }
  connectionsToResolve = connectionsToResolve.filter(
    ({ output }) => wireValues[output] === undefined,
  );
}

const value = Object.entries(wireValues)
  .filter(([key]) => key.startsWith("z"))
  .sort(([keyA], [keyB]) => (keyA < keyB ? 1 : -1))
  .map(([_, value]) => value)
  .join("");
console.log("result", parseInt(value, 2), value);
// console.log(
//   Object.entries(wireValues)
//     .sort(([keyA], [keyB]) => (keyA < keyB ? -1 : 1))
//     .map(([key, value]) => `${key}: ${value}`)
//     .join("\r\n"),
// );

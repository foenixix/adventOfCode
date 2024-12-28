import INPUTS from "./24.json";

type Operation = "OR" | "XOR" | "AND";
interface ParsedConnection {
  operation: Operation;
  inputs: [string, string];
  output: string;
}
const CONNECTION_REGEX = /(.*) (.*) (.*) -> (.*)/;
//run the program until it fails, then manually check what is going wrong and add this to the manual changes
const MANUAL_CHANGES: [string, string][] = [
  ["mvb", "z08"],
  ["jss", "rds"],
  ["wss", "z18"],
  ["bmn", "z23"],
];

const { initial, connections } = INPUTS.value;

const connectionList: ParsedConnection[] = connections.map(
  (connectionString) => {
    const [_, input1, operation, input2, output] =
      connectionString.match(CONNECTION_REGEX)!;
    return {
      operation: operation as Operation,
      inputs: [input1, input2].sort() as [string, string],
      output,
    };
  },
);

for (const [switchA, switchB] of MANUAL_CHANGES) {
  const connectionA = connectionList.find(({ output }) => output === switchA)!;
  const connectionB = connectionList.find(({ output }) => output === switchB)!;
  connectionA.output = switchB;
  connectionB.output = switchA;
}

const bits = initial.length / 2;

function findOutput(
  operation: Operation,
  inputs: [string, string],
  debugString: string,
): string {
  const result = connectionList.find(
    ({ operation: op, inputs: inp }) =>
      op === operation && inp[0] === inputs[0] && inp[1] === inputs[1],
  );
  if (!result) {
    throw new Error(
      `no output found for ${operation}: [${inputs.join(",")}] while searching for ${debugString}`,
    );
  }
  return result.output;
}

let carryBit: string;

// first halfAdder
const z00 = findOutput("XOR", ["x00", "y00"], "z00");
if (z00 !== "z00") {
  throw new Error(`Half adder for z00 is wrong, found "${z00}" instead`);
}
carryBit = findOutput("AND", ["x00", "y00"], "carryBit 00");

// full-adders
for (let i = 1; i < bits - 2; i++) {
  console.log(i, carryBit);
  const index = String(i).padStart(2, "0");
  const tempSum = findOutput(
    "XOR",
    ["x" + index, "y" + index],
    "tempSum" + index,
  );
  const bottomCarry = findOutput(
    "AND",
    ["x" + index, "y" + index],
    "bottomCarry" + index,
  );
  const zI = findOutput(
    "XOR",
    [carryBit, tempSum].sort() as [string, string],
    "z" + index,
  );
  if (zI !== "z" + index) {
    throw new Error(`Full-adder for z${index} is wrong, found "${zI}" instead`);
  }
  const topCarry = findOutput(
    "AND",
    [carryBit, tempSum].sort() as [string, string],
    "topCarry" + index,
  );
  carryBit = findOutput(
    "OR",
    [bottomCarry, topCarry].sort() as [string, string],
    "carryBit" + index,
  );
}

console.log(
  MANUAL_CHANGES.flatMap((a) => a)
    .sort()
    .join(","),
);

import INPUTS from "./12.json";

interface PlotInfo {
  surface: number;
  topPerimeters: [number, number][];
  rightPerimeters: [number, number][];
  bottomPerimeters: [number, number][];
  leftPerimeters: [number, number][];
}

const plots = INPUTS.value;

const visited: boolean[][] = [];
plots.forEach((row) => visited.push(new Array(row.length)));

function accumulateInfo(accumulator: PlotInfo, value: PlotInfo) {
  accumulator.surface += value.surface;
  accumulator.topPerimeters.push(...value.topPerimeters);
  accumulator.rightPerimeters.push(...value.rightPerimeters);
  accumulator.bottomPerimeters.push(...value.bottomPerimeters);
  accumulator.leftPerimeters.push(...value.leftPerimeters);
}

function getPlotInfo(x: number, y: number): PlotInfo {
  visited[y][x] = true;
  const value = plots[y][x];
  const result: PlotInfo = {
    surface: 1,
    topPerimeters: [],
    rightPerimeters: [],
    bottomPerimeters: [],
    leftPerimeters: [],
  };
  if (x > 0 && plots[y][x - 1] === value) {
    if (!visited[y][x - 1]) {
      accumulateInfo(result, getPlotInfo(x - 1, y));
    }
  } else {
    result.leftPerimeters.push([x, y]);
  }
  if (x < plots[0].length - 1 && plots[y][x + 1] === value) {
    if (!visited[y][x + 1]) {
      accumulateInfo(result, getPlotInfo(x + 1, y));
    }
  } else {
    result.rightPerimeters.push([x, y]);
  }
  if (y > 0 && plots[y - 1][x] === value) {
    if (!visited[y - 1][x]) {
      accumulateInfo(result, getPlotInfo(x, y - 1));
    }
  } else {
    result.topPerimeters.push([x, y]);
  }
  if (y < plots.length - 1 && plots[y + 1][x] === value) {
    if (!visited[y + 1][x]) {
      accumulateInfo(result, getPlotInfo(x, y + 1));
    }
  } else {
    result.bottomPerimeters.push([x, y]);
  }
  return result;
}

function countVerticalPerimeters(perimeters: [number, number][]): number {
  let result = 0;
  for (let x = 0; x < plots[0].length; x++) {
    const columnPerimetersHeights = perimeters
      .filter((perimeter) => x === perimeter[0])
      .map((perimeter) => perimeter[1])
      .sort();
    if (columnPerimetersHeights.length > 0) {
      result++;
      for (let i = 0; i < columnPerimetersHeights.length - 1; i++) {
        const current = columnPerimetersHeights[i];
        const next = columnPerimetersHeights[i + 1];
        if (current !== next - 1) {
          result++;
        }
      }
    }
  }
  return result;
}

function countHorizontalPerimeters(perimeters: [number, number][]): number {
  let result = 0;
  for (let y = 0; y < plots.length; y++) {
    const rowPerimetersDepth = perimeters
      .filter((perimeter) => y === perimeter[1])
      .map((perimeter) => perimeter[0])
      .sort();
    if (rowPerimetersDepth.length > 0) {
      result++;
      for (let i = 0; i < rowPerimetersDepth.length - 1; i++) {
        const current = rowPerimetersDepth[i];
        const next = rowPerimetersDepth[i + 1];
        if (current !== next - 1) {
          result++;
        }
      }
    }
  }
  return result;
}

let result = 0;
plots.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    if (visited[y][x]) {
      continue;
    }
    const info = getPlotInfo(x, y);
    const topPerimeters = countHorizontalPerimeters(info.topPerimeters);
    const rightPerimeters = countVerticalPerimeters(info.rightPerimeters);
    const bottomPerimeters = countHorizontalPerimeters(info.bottomPerimeters);
    const leftPerimeters = countVerticalPerimeters(info.leftPerimeters);
    const perimeters =
      topPerimeters + rightPerimeters + bottomPerimeters + leftPerimeters;
    // console.log(
    //   row[x],
    //   info.surface,
    //   perimeters,
    //   topPerimeters,
    //   rightPerimeters,
    //   bottomPerimeters,
    //   leftPerimeters,
    // );
    result += perimeters * info.surface;
  }
});

console.log(result);

import INPUTS from "./12.json";

interface PlotInfo {
  surface: number;
  perimeter: number;
}

const plots = INPUTS.value;

const visited: boolean[][] = [];
plots.forEach((row) => visited.push(new Array(row.length)));

function getPlotInfo(x: number, y: number): PlotInfo {
  visited[y][x] = true;
  const value = plots[y][x];
  const result: PlotInfo = { surface: 1, perimeter: 0 };
  if (x > 0 && plots[y][x - 1] === value) {
    if (!visited[y][x - 1]) {
      const { surface, perimeter } = getPlotInfo(x - 1, y);
      result.surface += surface;
      result.perimeter += perimeter;
    }
  } else {
    result.perimeter++;
  }
  if (x < plots[0].length - 1 && plots[y][x + 1] === value) {
    if (!visited[y][x + 1]) {
      const { surface, perimeter } = getPlotInfo(x + 1, y);
      result.surface += surface;
      result.perimeter += perimeter;
    }
  } else {
    result.perimeter++;
  }
  if (y > 0 && plots[y - 1][x] === value) {
    if (!visited[y - 1][x]) {
      const { surface, perimeter } = getPlotInfo(x, y - 1);
      result.surface += surface;
      result.perimeter += perimeter;
    }
  } else {
    result.perimeter++;
  }
  if (y < plots.length - 1 && plots[y + 1][x] === value) {
    if (!visited[y + 1][x]) {
      const { surface, perimeter } = getPlotInfo(x, y + 1);
      result.surface += surface;
      result.perimeter += perimeter;
    }
  } else {
    result.perimeter++;
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
    result += info.perimeter * info.surface;
  }
});

console.log(result);

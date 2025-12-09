import INPUTS from "./9_test.json";
const start = performance.now();

const corners = INPUTS.data.map(coords => coords.split(",").map(a => parseInt(a)));

let highestArea = 0;

for(let i=0; i<corners.length; i++){
  for(let j=i+1; j<corners.length; j++){
    if(corners[i][0] === corners[j][0] || corners[i][1] === corners[j][0]){
      continue;
    }
    const area = (Math.abs(corners[i][0] - corners[j][0])+1) * (Math.abs(corners[i][1] - corners[j][1])+1)
    if(area > highestArea){
      highestArea = area
    }
  }
}

console.log(`full end at ${((performance.now() - start) / 1000).toFixed(3)}`);
console.log("result", highestArea);

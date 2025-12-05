import INPUTS from "./5.json";

const ranges = INPUTS.ranges.map(rangeString => {
  const index = rangeString.indexOf("-")
  const min = parseInt(rangeString.substring(0,index))
  const max = parseInt(rangeString.substring(index+1))
  return [min,max]
});

let result = 0;
for (const id of INPUTS.ids){
  if(inRange(parseInt(id))){
    result++
  }
}

function inRange(id: number){
  for (const range of ranges){
    if(id >= range[0] && id <= range[1]){
      return true
    }
  }
  return false
}

console.log("result", result);

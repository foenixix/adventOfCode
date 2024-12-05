import INPUTS from "./5.json";

const ordering = INPUTS.value.ordering;
const lists = INPUTS.value.lists;

const orderingMap: Record<number, number[]> = {};

ordering.forEach(([before, after]) => {
  if (!orderingMap[after]) {
    orderingMap[after] = [];
  }
  orderingMap[after].push(before);
});

const result = lists
  .filter((list) => {
    const forbiddenItems = new Set<number>();
    for (let item of list) {
      if (forbiddenItems.has(item)) {
        return false;
      }
      orderingMap[item]?.forEach((forbiddenItem) =>
        forbiddenItems.add(forbiddenItem),
      );
    }
    return true;
  })
  .map((list) => list[(list.length - 1) / 2])
  .reduce((acc, value) => acc + value, 0);

console.log(result);

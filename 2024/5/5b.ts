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
        return true;
      }
      orderingMap[item]?.forEach((forbiddenItem) =>
        forbiddenItems.add(forbiddenItem),
      );
    }
    return false;
  })
  .map((list) => {
    list.sort((a, b) => {
      if (orderingMap[a]?.includes(b)) {
        return 1;
      } else if (orderingMap[b]?.includes(a)) {
        return -1;
      } else {
        return 0;
      }
    });
    return list[(list.length - 1) / 2];
  })
  .reduce((acc, value) => acc + value, 0);

console.log(result);

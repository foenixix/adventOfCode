import json 

with open('./6.json', 'r') as file:
    INPUTS = json.load(file)

GUARD_UP = "^";
OBSTACLE = "#";

startMap = INPUTS.get("value");

for row in startMap:
    try:    
      startX = row.index(GUARD_UP)
      startY = startMap.index(row)
      startDir = "up"
      break
    except:
      pass
     
startVisitedPlaces = set();

x= startX
y= startY
dir = startDir
while True:
  startVisitedPlaces.add((x,y))
  if (dir == "up") : 
    if (y == 0):
      break;
    if startMap[y - 1][x] == OBSTACLE:
      dir = "right";
    else:
      y -= 1;
  elif (dir == "right"):
    if (x == len(startMap[0]) - 1):
      break;
    if (startMap[y][x + 1] == OBSTACLE):
      dir = "down";
    else:
      x += 1;
  elif (dir == "down"):
    if (y == len(startMap) - 1):
      break;
    if startMap[y + 1][x] == OBSTACLE:
      dir = "left";
    else:
      y += 1;
  elif dir == "left":
    if (x == 0):
      break;
    if (startMap[y][x - 1] == OBSTACLE):
      dir = "up";
    else:
      x -= 1;

print(len(startVisitedPlaces));

def isLoop(map, x, y, dir):
  visitedPlaces = set();

  while True:
    posEntry = (x,y,dir);
    if (posEntry in visitedPlaces):
      return True;
    visitedPlaces.add(posEntry);
    if (dir == "up"):
      if (y == 0) :
        return False;
      if (map[y - 1][x] == OBSTACLE):
        dir = "right";
      else:
        y -= 1;
    elif dir == "right":
      if (x == map[0].length - 1):
        return False;
      if (map[y][x + 1] == OBSTACLE):
        dir = "down";
      else:
        x += 1;
    elif dir == "down":
      if (y == map.length - 1):
        return False;
      if (map[y + 1][x] == OBSTACLE):
        dir = "left";
      else:
        y += 1;
    elif dir == "left":
      if (x == 0):
        return False;
      if (map[y][x - 1] == OBSTACLE):
        dir = "up";
      else:
        x -= 1;

print(isLoop(startMap, startX, startY, startDir))
# const startMapString = JSON.stringify(startMap);
# let count = 0;
# for (const pos of visited) {
#   const obstX = parseInt(pos.split(",")[0]);
#   const obstY = parseInt(pos.split(",")[1]);
#   if (obstX == startX && obstY == startY) {
#     continue;
#   }
#   const map = JSON.parse(startMapString);
#   map[obstY] =
#     map[obstY].substring(0, obstX) + "#" + map[obstY].substring(obstX + 1);
#   if (isLoop(map, startX, startY, startDir)) {
#     count++;
#   }
# }

# console.log(count);

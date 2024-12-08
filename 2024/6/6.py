import json 
import time

startTime = time.time()

with open('./6.json', 'r') as file:
    INPUTS = json.load(file)

GUARD_UP = "^"
OBSTACLE = "#"

startMap = INPUTS.get("value")

for row in startMap:
    try:    
      startX = row.index(GUARD_UP)
      startY = startMap.index(row)
      startDir = "up"
      break
    except:
      pass
     
startVisitedPlaces = set()

x= startX
y= startY
dir = startDir
while True:
  startVisitedPlaces.add((x,y))
  if (dir == "up") : 
    if (y == 0):
      break
    if startMap[y - 1][x] == OBSTACLE:
      dir = "right"
    else:
      y -= 1
  elif (dir == "right"):
    if (x == len(startMap[0]) - 1):
      break
    if (startMap[y][x + 1] == OBSTACLE):
      dir = "down"
    else:
      x += 1
  elif (dir == "down"):
    if (y == len(startMap) - 1):
      break
    if startMap[y + 1][x] == OBSTACLE:
      dir = "left"
    else:
      y += 1
  elif dir == "left":
    if (x == 0):
      break
    if (startMap[y][x - 1] == OBSTACLE):
      dir = "up"
    else:
      x -= 1

print(len(startVisitedPlaces))

def isLoop(map, x, y, dir):
  visitedPlaces = set()

  while True:
    posEntry = (x,y,dir)
    if (posEntry in visitedPlaces):
      return True
    visitedPlaces.add(posEntry)
    if (dir == "up"):
      if (y == 0) :
        return False
      if (map[y - 1][x] == OBSTACLE):
        dir = "right"
      else:
        y -= 1
    elif dir == "right":
      if (x == len(map[0]) - 1):
        return False
      if (map[y][x + 1] == OBSTACLE):
        dir = "down"
      else:
        x += 1
    elif dir == "down":
      if (y == len(map) - 1):
        return False
      if (map[y + 1][x] == OBSTACLE):
        dir = "left"
      else:
        y += 1
    elif dir == "left":
      if (x == 0):
        return False
      if (map[y][x - 1] == OBSTACLE):
        dir = "up"
      else:
        x -= 1

count = 0
for pos in startVisitedPlaces:
  obstX = pos[0]
  obstY = pos[1]
  if (obstX == startX and obstY == startY):
    continue
  originalRow = startMap[obstY]
  startMap[obstY] =  startMap[obstY][0: obstX] + "#" + startMap[obstY][obstX + 1:]

  if(len(originalRow) != len(startMap[obstY])):
    print(originalRow)
    print(startMap[obstY])
    print("pop")
  if (isLoop(startMap, startX, startY, startDir)):
    count+=1
  startMap[obstY] = originalRow

print(count)
print("%s seconds" % (time.time() - startTime))

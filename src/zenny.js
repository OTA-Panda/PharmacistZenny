const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 20
//multiplies 1px by scaleUp to x, y
context.scale(scaleUp, scaleUp)

//pushes an array of length 'width' with each element as 0
//into array 'matrix,' decrementing 'height' until falsey (i.e. 0)
bottleCreate = (width, height) => {
  const matrix = []
  while (height--) { 
    matrix.push(new Array(width).fill(0))
  }
  return matrix
}

//instantiate logical 2d field with 8 columns and 16 rows filled with 0s
const bottle = bottleCreate(8, 16)
console.log(bottle); console.table(bottle)

//offsets for moving graphics and logic
const bottleOffset = {
  x: 3,
  y: 3,
}

//position of spout on bottle
const bottleSpout = {
  x: 3,
  y: 0,
}

// logical 2d matrix of pill with room to pillRotate
const pillMatrix = [
  [1, 0],
  [1, 0],
]

bottleClear = () => {
  bottle.forEach(row => row.fill(0))
}

bottleSectionClear = (matchesArray) => {
  for (let i = 0; i < matchesArray.length; i++) {
    const x = matchesArray[i][0]
    const y = matchesArray[i][1]
    bottle[y][x] = 0
  }
}

bottleCheck = () => {
  console.log("In bottleCheck")
  console.log("==============")
  let consecutive = 1
  for (let x = 0; x < bottle[0].length - 1  ; ++x) {
    let verticalPositions = []
    for (let y = bottle.length - 1; y > 0; --y) {
      if (bottle[y][x] && bottle[y - 1][x] && bottle[y][x] === bottle[y - 1][x]) {
        if (consecutive === 1) verticalPositions.push([x, y - 1])
        consecutive++
        console.log(consecutive)
        verticalPositions.push([x, y])
      } else {
        if (consecutive > 3) {
          console.log("4 chain!")
          console.log(verticalPositions)
          bottleSectionClear(verticalPositions)
        }
        consecutive = 1
        verticalPositions = []
      }
      //if at end of row, check consecutive and remove items if great than 3
      if (y === 0 && consecutive > 3) {
        console.log("4 chain!")
        console.log(verticalPositions)
        bottleSectionClear(verticalPositions)
      }
      // console.log(`${bottle[y][x]} ${consecutive}`)
    }
  }
}


// bottleCheck = () => {
//   console.log("In bottleCheck")
//   console.log("==============")
//   let consecutive = 1
//   let horizontalPositions = []
//   for (let y = bottle.length - 1; y > 0; --y) {  //14 to check only first row
//     // let consecutive = 1
//     // let horizontalPositions = []
//     for (let x = 0; x < bottle[y].length; ++x) {
//       if (bottle[y][x] && bottle[y][x - 1] && bottle[y][x] === bottle[y][x - 1]) {
//         if (consecutive === 1) horizontalPositions.push([x - 1, y])
//         consecutive++
//         horizontalPositions.push([x, y])
//       } else {
//         if (consecutive > 3) {
//           console.log("4 chain!")
//           console.log(horizontalPositions)
//           bottleSectionClear(horizontalPositions)
//         }
//         consecutive = 1
//         horizontalPositions = []
//       }
//       //if at end of row, check consecutive and remove items if great than 3
//       if (x === bottle[y].length - 1 && consecutive > 3) {
//         console.log("4 chain!")
//         console.log(horizontalPositions)
//         bottleSectionClear(horizontalPositions)
//       }
//       // console.log(`${bottle[y][x]} ${consecutive}`)
//     }
//   }
// }


pillCreate = (type) => {
  switch (type) {
    case 'rr':
      return [
        ['red', 0],
        ['red', 0],
      ]
    case 'ry':
      return [
        ['red', 0],
        ['yellow', 0],
      ]
    case 'rb':
      return [
        ['red', 0],
        ['blue', 0],
      ]
    case 'yy':
      return [
        ['yellow', 0],
        ['yellow', 0],
      ]
    case 'yb':
      return [
        ['yellow', 0],
        ['blue', 0],
      ]
    case 'bb':
      return [
        ['blue', 0],
        ['blue', 0],
      ]
  }
}


//paramaters of player's pill and its logical shape, orientation, and position
const player = { 
  pos: {x: bottleSpout.x, y: bottleSpout.y}, //starting position of pill
  pill: pillCreate('bb'),
}

draw = () => {
  context.fillStyle = '#000' //black
  context.fillRect(0, 0, canvas.width, canvas.height) //background based on index.html
  context.fillStyle = '#55f' //blue
  context.fillRect(0 + bottleOffset.x, 0 + bottleOffset.y, 8, 16) //bottle
  context.fillStyle = '#55f' //blue
  context.fillRect(
    bottleSpout.x + bottleOffset.x,
    bottleSpout.y + bottleOffset.y - 1,
    2, 1) //spout
  drawMatrix(bottle, { x: 0, y: 0}) //draw any spaces that exist in logic
  drawMatrix(player.pill, player.pos) //draws shape based on position

}


//function that renders pill based on matrix and offset given
drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = value
        context.fillRect(
          x + offset.x + bottleOffset.x, //position x
          y + offset.y + bottleOffset.y, //position y
          1, //1 unit(px) wide
          1  //1 unit(px) high
        )
      }
    })
  })
}

//based on matrix
_merge = (bottle, player) => {
  player.pill.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        bottle[y + player.pos.y][x + player.pos.x] = value
      }
    })
  })
}

// drape over bottle and check if player's piece collides
_collide = (bottle, player) => {
  const [pill, offset] = [player.pill, player.pos]
  for (let y = 0; y < pill.length; ++y) { //add y first to check next pos
    for (let x = 0; x < pill[y].length; ++x) { //add x first to check next pos
      if (
        pill[y][x] !== 0 && // if pill shape exists in space...
        (
          bottle[y + offset.y] && // check if bottle row exists then...
          bottle[y + offset.y][x + offset.x] // check if collumn exists...
        ) !== 0 //if row and column exist, check if space is occupied
      ) {
        return true // if all conditions pass, collision is true
      }
    }
  }
  return false // else collision is false
}

let dropCounter = 0
let dropInterval = 500 // 1000ms = 1s
let lastTime = 0 

pillNew = () => {
  const pills = ['rr', 'ry', 'rb', 'yy', 'yb', 'bb']
  // console.log(pills[pills.length * Math.random() | 0])
  player.pill = pillCreate(pills[pills.length * Math.random() | 0])
  player.pos.x = bottleSpout.x
  player.pos.y = bottleSpout.y
  // console.log(bottleSpout.x)
  // console.log(bottleSpout.y)
  if (_collide(bottle, player)) {
    bottleClear()
    
  }
}

pillDrop = () => {
  player.pos.y++
  if (_collide(bottle, player)) {
    player.pos.y--
    _merge(bottle, player)
    bottleCheck(bottle)
    pillNew()
    
    // console.table(bottle)
  }
  dropCounter = 0
}

//Define Game Loop
gameLoop = (time = 0) => {
  const deltaTime = time - lastTime //change in time
  lastTime = time //roughly 16.7ms

  //update player position in bottle on y value
  //whenever dropCounter is greater than 1s
  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    pillDrop()
  }
  // console.log(deltaTime)
  draw() //draw or rather re-draw
  requestAnimationFrame(gameLoop) //recursive loop -- never ends
}

// moves player in desired direction, but stops if collision is true
playerMove = (dir) => {
  player.pos.x += dir
  if (_collide(bottle, player)) {
    player.pos.x -= dir
  }
}

pillRotate = (matrix, dir) => {  //***NEED TO FIX
  // console.table(matrix)
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x]
      ] = [          //flips 2d array along 135 deg axis; everything backwards
        matrix[y][x],
        matrix[x][y]
      ]
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse())
  } else {
    matrix.reverse()
  }
}

playerRotate = (dir) => {
  const pos = player.pos.x
  let offset = -1
  pillRotate(player.pill, dir)
  while (_collide(bottle, player)) {
    player.pos.x += offset
    offset = -(offset + (offset > 0 ? 1 : -1))
    if (offset > player.pill[0].length) {
      pillRotate(player.pill, -dir)
      player.pos.x = pos
      return
    }
  }
}

//User Interface
document.addEventListener('keydown', event => {
  // console.log(event)
  switch (event.code) {
    case "ArrowLeft":  // move pill left
      playerMove(-1)
      break
    case "ArrowRight": // move pill right
      playerMove(+1)
      break
    case "ArrowDown":  // move pill down : accelerate
      pillDrop()
      break
    case "KeyD":       // pillRotate counter-clockwise
      playerRotate(-1)
      break
    case "KeyF":       // pillRotate clockwise
      playerRotate(1)
      break
    case "Space": //to be used for instant drop
      break
  }
})


gameLoop() //instantiates game loop
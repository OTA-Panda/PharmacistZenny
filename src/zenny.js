const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 20
//multiplies 1px by scaleUp to x, y
context.scale(scaleUp, scaleUp)

//pushes an array of length 'width' with each element as 0
//into array 'matrix,' decrementing 'height' until falsey (i.e. 0)
createMatrix = (width, height) => {
  const matrix = []
  while (height--) { 
    matrix.push(new Array(width).fill(0))
  }
  return matrix
}

//instantiate logical 2d field with 8 columns and 16 rows filled with 0s
bottle = createMatrix(8, 16)
console.log(bottle); console.table(bottle)


// logical 2d matrix of pill
const matrix = [
  [1, 0],
  [1, 0],
]

//data to be given to draw()
const player = { 
  pos: {x: 5, y: 5},
  matrix: matrix
}

draw = () => {
  //Draws Black background based on canvas width and height in index.html
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#55f'
  context.fillRect(2, 2, 8, 16)
  context.fillStyle = '#55f'
  context.fillRect(5, 1, 2, 1)
  //Draws Shape based off of position and matrix in const player
  drawMatrix(player.matrix, player.pos)

}

//function draw matrix data (pill shape)
drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red'
        context.fillRect(
          x + offset.x,
          y + offset.y,
          1,
          1
        )
      }
    })
  })
}

//based on matrix
merge = (bottle, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        bottle[y + player.pos.y][x + player.pos.x] = value
      }
    })
  })
}

// drape over bottle and check if player's piece collides
collide = (bottle, player) => {
  const [matrix, offset] = [player.matrix, player.pos]
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < matrix[y].length; ++x) {
      if (
        matrix[y][x] !== 0 && // if matrix shape exists in space...
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
let dropInterval = 1000 // 1000ms = 1s
let lastTime = 0 

pillDrop = () => {
  player.pos.y++
  if (collide(bottle, player)) {
    player.pos.y--
    merge(bottle, player)
    player.pos.y = 0
    console.table(bottle)
  }
  dropCounter = 0

}

//Define Game Loop
update = (time = 0) => {
  const deltaTime = time - lastTime //change in time
  lastTime = time //roughly 16.7ms

  //update player position of matrix on y value
  //whenever dropCounter is greater than 1s
  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    pillDrop()
  }

  // console.log(deltaTime)

  draw() //draw or rather re-draw
  requestAnimationFrame(update) //recursive loop -- never ends
}

//Pill position manipulation
document.addEventListener('keydown', event => {
  switch (event.key) {
    case "ArrowLeft":
      player.pos.x--
      break
    case "ArrowRight":
      player.pos.x++
      break
    case "ArrowDown":
      pillDrop()
      break
  }
})


update () //instantiates game loop
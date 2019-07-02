const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')


const scaleUp = 20

//multiplies 1px by scaleUp to x, y
context.scale(scaleUp, scaleUp)

const matrix = [
  [1, 0],
  [1, 0],
]

createMatrix = (width, height) => {
  const matrix = []
  while (height--) {
    matrix.push(new Array(width).fill(0))
  }
  return matrix
}

//data to be given to draw()
const player = { 
  pos: {x: 5, y: 5},
  matrix: matrix
}

draw = () => {
  //Draws Black Canvas
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  //Draws Shape based off of matrix
  drawMatrix(player.matrix, player.pos)

}

//function draw matrix data
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


let dropCounter = 0
let dropInterval = 1000 // 1000ms = 1s
let lastTime = 0 

pillDrop = () => {
  player.pos.y++
  dropCounter=0
}

update = (time = 0) => {
  const deltaTime = time - lastTime //change in time
  lastTime = time //roughly 16.7ms

  //update player position of matrix on y value
  //whenever dropCounter is greater than 1s
  dropCounter += deltaTime
  if (dropCounter > dropInterval) {
    pillDrop()
  }

  console.log(deltaTime)

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


update () //instantiates loop
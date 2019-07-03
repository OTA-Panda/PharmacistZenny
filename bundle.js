/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/zenny.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/zenny.js":
/*!**********************!*\
  !*** ./src/zenny.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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

// logical 2d matrix of pill with room to rotate
const pillMatrix = [
  [1, 0],
  [1, 0],
]

bottleClear = () => {
  bottle.forEach(row => row.fill(0))
}

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
merge = (bottle, player) => {
  player.pill.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        bottle[y + player.pos.y][x + player.pos.x] = value
      }
    })
  })
}

// drape over bottle and check if player's piece collides
collide = (bottle, player) => {
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
let dropInterval = 1000 // 1000ms = 1s
let lastTime = 0 

pillNew = () => {
  const pills = ['rr', 'ry', 'rb', 'yy', 'yb', 'bb']
  // console.log(pills[pills.length * Math.random() | 0])
  player.pill = pillCreate(pills[pills.length * Math.random() | 0])
  player.pos.x = bottleSpout.x
  player.pos.y = bottleSpout.y
  console.log(bottleSpout.x)
  console.log(bottleSpout.y)
  if (collide(bottle, player)) {
    bottleClear()
    
  }
}

pillDrop = () => {
  player.pos.y++
  if (collide(bottle, player)) {
    player.pos.y--
    merge(bottle, player)
    pillNew()
    
    // console.table(bottle)
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

// moves player in desired direction, but stops if collision is true
playerMove = (dir) => {
  player.pos.x += dir
  if (collide(bottle, player)) {
    player.pos.x -= dir
  }
}

rotate = (matrix, dir) => {  //***NEED TO FIX
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
  rotate(player.pill, dir)
  while (collide(bottle, player)) {
    player.pos.x += offset
    offset = -(offset + (offset > 0 ? 1 : -1))
    if (offset > player.pill[0].length) {
      rotate(player.pill, -dir)
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
    case "KeyD":       // rotate counter-clockwise
      playerRotate(-1)
      break
    case "KeyF":       // rotate clockwise
      playerRotate(1)
      break
    case "Space": //to be used for instant drop
      break
  }
})


update () //instantiates game loop

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
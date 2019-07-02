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

//paramaters of player's pill and its logical shape/orientation
const player = { 
  pos: {x: 5, y: 5},
  matrix: matrix
}

draw = () => {
  context.fillStyle = '#000' //black
  context.fillRect(0, 0, canvas.width, canvas.height) //background based on index.html
  context.fillStyle = '#55f' //blue
  context.fillRect(2, 2, 8, 16) //spout
  context.fillStyle = '#55f' //blue
  context.fillRect(5, 1, 2, 1) //bottle
  drawMatrix(player.matrix, player.pos) //draws shape based on position

}

//function that defines pill based on matrix and offset given
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
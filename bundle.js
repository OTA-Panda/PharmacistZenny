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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/testing.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/pill.js":
/*!****************************!*\
  !*** ./src/assets/pill.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Pill {
  constructor (context, position, colors, size) {
    this.context = context
    this.position = position
    this.size = size
    this.horizontal = true
    this.positionA = position
    this.positionB = { x: position.x + size, y: position.y }
    this.colorA = colors[Math.random() * colors.length | 0]
    this.colorB = colors[Math.random() * colors.length | 0]
    this.pillA = new PillHalf(context, this.positionA, "left", this.colorA, size)
    this.pillB = new PillHalf(context, this.positionB, "right", this.colorB, size)
  }

  draw() {
    this.pillA.drawPillHalf()
    this.pillB.drawPillHalf()
  }

  rotate(direction) {
    if (direction > 0) {
      // console.log(this.pillA)
      switch (this.pillA.getPillOrientation()) {
        
        case "left":                    //[0, 0]
        console.log(this.pillA.getPillOrientation())
        this.pillA.setPillPosition({    //[A, B]
          x: this.position.x, y: this.position.y - this.size
        }).setPillOrientation("up")     //[A, 0]
        this.pillB.setPillPosition({    //[B, 0]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("down")
        break
        case "up":                      //[A, 0]
        this.pillA.setPillPosition({    //[B, 0]
          x: this.position.x + this.size, y: this.position.y
        }).setPillOrientation("right")  //[0, 0]
        this.pillB.setPillPosition({    //[B, A]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("left")
        break
        case "right":                   //[0, 0]
        this.pillA.setPillPosition({    //[B, A]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("down")   //[B, 0]
        this.pillB.setPillPosition({    //[A, 0]
          x: this.position.x, y: this.position.y - this.size
        }).setPillOrientation("up")
        break
        case "down":                    //[B, 0]
        this.pillA.setPillPosition({    //[A, 0]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("left")   //[0, 0]
        this.pillB.setPillPosition({    //[A, B]
          x: this.position.x + this.size, y: this.position.y
        }).setPillOrientation("right")
        break
      }
    }
  }
}


class PillHalf {
  constructor (context, position, orientation, color, size) {
    this.context = context
    this.position = position
    this.orientation = orientation
    this.color = color
    this.attached = true
    this.size = size
  }

  getPillAngle(orientation) {
    switch (orientation) {
      case "up": return -90
      case "down": return 90
      case "left": return 180
      case "right": return 0
    }
  }

  getPillOrientation() {
    return this.orientation
  }
  
  setPillOrientation(orientation) {
    this.orientation = orientation
    return this
  }

  setPillPosition(position) {
    this.position = position
    return this
  }

  drawPillHalf() {
    let x = this.position.x
    let y = this.position.y
    let size = this.size
    let degrees = this.getPillAngle(this.orientation)
    let curvature = .225  //affects corners of capsule
    const lineWidth = this.size / 20
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';

    this.context.save()
      //rotate
      this.context.translate(x + size / 2, y + size / 2)
        this.context.rotate(Math.PI / 180 * degrees) // rotates clockwise
      this.context.translate(-x - size / 2, -y - size / 2)
      //render
      this.context.beginPath();
      this.context.moveTo(x, y + offset); // top left origin
      this.context.lineTo(x + size / 2, y + offset);
      this.context.bezierCurveTo(
        x + size * (1 - curvature),
        y + offset,  
        x + size - offset,
        y + offset + size * curvature,
        x + size - offset,
        y + size / 2
      )
      this.context.bezierCurveTo(
        x + size - offset,
        y + size - offset - size * curvature,
        x + size * (1 - curvature),
        y + size - offset,
        x + size / 2,
        y + size - offset
      )
      this.context.lineTo(x, y + size - offset)
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    this.context.restore()
  }
}

class PillPart {
  constructor(context, position, color, size) {
    this.context = context
    this.position = position
    this.color = color
    this.size = size
  }


  drawPillPart(){
    let x = this.position.x
    let y = this.position.y
    let size = this.size
    const lineWidth = this.size / 20
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';
    
    this.context.beginPath();
    this.context.arc(
      x + size / 2,
      y + size / 2,
      size / 2 - offset,
      0,
      Math.PI * 2
    )
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Pill);

/***/ }),

/***/ "./src/testing.js":
/*!************************!*\
  !*** ./src/testing.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_pill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/pill */ "./src/assets/pill.js");



const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 20
const size = 1
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','deepskyblue'] //temp


const pill1 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 0 * size, y: 1 * size }, colors, size)
const pill2 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 0 * size, y: 3 * size }, colors, size)
const pill3 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 0 * size, y: 4 * size }, colors, size)

pill1.draw()
pill2.draw()
pill3.draw()


setTimeout(() => {
  pill1.rotate(1)
  pill1.draw()
  setTimeout(() => {
    pill1.rotate(1)
    pill1.draw()
    setTimeout(() => {
      pill1.rotate(1)
      pill1.draw()
      setTimeout(() => {
        pill1.rotate(1)
        pill1.draw()
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
// pill1.rotate(1)
// setTimeout(() => pill1.draw(), 2000)
// pill1.rotate(1)
// setTimeout(() => pill1.draw(), 1000)
// pill1.rotate(1)
// setTimeout(() => pill1.draw(), 1000)

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
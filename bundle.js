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
  constructor (context, position, direction, colors, side) {
    this.context = context
    this.position = position
    this.direction = direction
    this.color = colors[Math.random() * colors.length | 0]
    this.attached = true
    this.side = side
  }

  getPillAngle(direction) {
    switch (direction) {
      case "up": return 180
      case "down": return 0
      case "left": return 90
      case "right": return -90
    }
  }

  drawPillHalf() {
    let x = this.position.x
    let y = this.position.y
    let width = 20
    let height = 20
    let degrees = this.getPillAngle(this.direction)
    const lineWidth = 1
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';

    this.context.save()
      //rotate
      this.context.translate(x + width / 2, y + height / 2)
        this.context.rotate(Math.PI / 180 * degrees);
      this.context.translate(-x - width / 2, -y - height / 2)
      //render
      this.context.beginPath();
      this.context.moveTo(x + offset, y); // top left origin
      this.context.lineTo(x + offset, y + height / 2);
      this.context.bezierCurveTo(
        x + offset,
        y + height * 1.1 + offset,  
        x + width - offset,
        y + height * 1.1 + offset,
        x + width - offset,
        y + height / 2 + offset);
      this.context.lineTo(x + width - offset, y)
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    this.context.restore()
  }


  drawPillPart(){
    let x = this.position.x
    let y = this.position.y
    let width = 20
    let height = 20
    const lineWidth = 1
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';
    
    this.context.beginPath();
    this.context.arc(
      x + width / 2,
      y + height / 2,
      width / 2 - offset,
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

const scaleUp = 7
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','blue'] //temp


const ph1 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 20, y: 10 }, "left", colors, 1)
const ph2 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 40, y: 10 }, "right",colors, -1)
const ph3 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 20, y: 30 }, "right",colors, -1)
const ph4 = new _assets_pill__WEBPACK_IMPORTED_MODULE_0__["default"](context, { x: 40, y: 30 }, "right",colors, -1)

ph1.drawPillHalf()
ph2.drawPillHalf()
ph3.drawPillPart()
ph4.drawPillPart()


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
import Pill from './pill'

class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.level = 1
    this.speed = 1000
    this.score = 0
    this.bottle = new Bottle
    this.gameOver = false
    this.pause = false
    this.currentPill = null
    this.virusCount = 0
  }


}
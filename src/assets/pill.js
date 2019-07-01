function Pill(color1, color2, vertical) {
  this.color1 = color1
  this.color2 = color2
  this.vertical = true
}

Pill.prototype.turn = function () {
  this.vertical = !this.vertical
}


const pill = new Pill()

pill.turn()

pill.__proto__ === Pill.prototype

module.export = Pill
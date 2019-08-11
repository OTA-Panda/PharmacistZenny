class Bottle {
  constructor(ctx, space, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.field = this.create()
  }

  create(){
    let field = new Array(this.height)
    for (let row = 0; row < field.length; row++) {
      field[row] = new Array(this.width).fill(0)
    }
    return field
  }

  fillSpace(x, y) {
    return this.field[x][y] = 1
  }
}

export default Bottle
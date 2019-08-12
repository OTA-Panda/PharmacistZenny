class Pill {
  constructor (context, bottle, position, colors, space) {
    this.context = context
    this.bottle = bottle
    this.position = position
    this.space = space
    this.connected = true
    this.active = true
    this.positionA = position
    this.positionB = { x: position.x + space, y: position.y }
    this.colorA = colors[Math.random() * colors.length | 0]
    this.colorB = colors[Math.random() * colors.length | 0]
    this.pillA = new PillHalf(context, this.positionA, "left", this.colorA, space)
    this.pillB = new PillHalf(context, this.positionB, "right", this.colorB, space)
    // this.pillA = new PillPart(context, positionA, this.colorA, space)
    // this.pillB = new PillPart(context, positionB, this.colorB, space)
    // context, position, color, space
  }

  getCoords() {
    return [
      this.pillA.getPillPosition().x,
      this.pillA.getPillPosition().y,
      this.pillB.getPillPosition().x,
      this.pillB.getPillPosition().y
    ]
  }
  
  draw() {
    this.pillA.draw()
    this.pillB.draw()
  }
  
  hasCollision() {
    const [xa, ya, xb, yb] = this.getCoords()
    return (this.board[xa][ya] !== 0 && this.board[xb][yb] !== 0)
  }

  drop() {
    const [xa, ya, xb, yb] = this.getCoords()
    this.pillA.setPillPosition({ x: xa, y: ya + this.space})
    this.pillB.setPillPosition({ x: xb, y: yb + this.space})
  }

  land() {
    const [xa, ya, xb, yb] = this.getCoords()
    this.bottle.fillSpace(xa, ya)
    this.bottle.fillSpace(xb, yb)
  }


  move(direction) {
    if (this.active) {
      const [xa, ya, xb, yb] = this.getCoords()
      if (direction > 0) {
        this.pillA.setPillPosition({ x: xa + this.space, y: ya })
        this.pillB.setPillPosition({ x: xb + this.space, y: yb })
      } else {
        this.pillA.setPillPosition({ x: xa - this.space, y: ya })
        this.pillB.setPillPosition({ x: xb - this.space, y: yb })
      }
    }
  }

  rotate(direction) {
    if (this.active) {
      if (direction > 0) {
        switch (this.pillA.getPillOrientation()) {
          case "left":                    //[0, 0]
          this.pillA.setPillPosition({    //[A, B]
            x: this.position.x, y: this.position.y - this.space
          }).setPillOrientation("up")     //[A, 0]
          this.pillB.setPillPosition({    //[B, 0]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("down")
          break
          case "up":                      //[A, 0]
          this.pillA.setPillPosition({    //[B, 0]
            x: this.position.x + this.space, y: this.position.y
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
            x: this.position.x, y: this.position.y - this.space
          }).setPillOrientation("up")
          break
          case "down":                    //[B, 0]
          this.pillA.setPillPosition({    //[A, 0]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("left")   //[0, 0]
          this.pillB.setPillPosition({    //[A, B]
            x: this.position.x + this.space, y: this.position.y
          }).setPillOrientation("right")
          break
        }
      } else {
        switch (this.pillA.getPillOrientation()) {
          case "left":                    //[0, 0]
          this.pillA.setPillPosition({    //[A, B]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("down")   //[B, 0]
          this.pillB.setPillPosition({    //[A, 0]
            x: this.position.x, y: this.position.y - this.space
          }).setPillOrientation("up")
          break
          case "down":                    //[B, 0]
          this.pillA.setPillPosition({    //[A, 0]
            x: this.position.x + this.space, y: this.position.y
          }).setPillOrientation("right")  //[0, 0]
          this.pillB.setPillPosition({    //[B, A]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("left")
          break
          case "right":                   //[0, 0]
          this.pillA.setPillPosition({    //[B, A]
            x: this.position.x, y: this.position.y - this.space
          }).setPillOrientation("up")     //[A, 0]
          this.pillB.setPillPosition({    //[B, 0]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("down")
          break
          case "up":                      //[A, 0]
          this.pillA.setPillPosition({    //[B, 0]
            x: this.position.x, y: this.position.y
          }).setPillOrientation("left")   //[0, 0]
          this.pillB.setPillPosition({    //[A, B]
            x: this.position.x + this.space, y: this.position.y
          }).setPillOrientation("right")
          break
        }
      }
    }
  }


}


class PillHalf {
  constructor (context, position, orientation, color, space) {
    this.context = context
    this.position = position
    this.orientation = orientation
    this.color = color
    this.attached = true
    this.space = space
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

  getPillPosition() {
    return this.position
  }

  setPillPosition(position) {
    this.position = position
    return this
  }

  draw() {
    let x = this.position.x
    let y = this.position.y
    let space = this.space
    let degrees = this.getPillAngle(this.orientation)
    let curvature = .225  //affects corners of capsule
    const lineWidth = this.space / 20
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';

    this.context.save()
      //rotate
      this.context.translate(x + space / 2, y + space / 2)
        this.context.rotate(Math.PI / 180 * degrees) // rotates clockwise
      this.context.translate(-x - space / 2, -y - space / 2)
      //render
      this.context.beginPath();
      this.context.moveTo(x, y + offset); // top left origin
      this.context.lineTo(x + space / 2, y + offset);
      this.context.bezierCurveTo(
        x + space * (1 - curvature),
        y + offset,  
        x + space - offset,
        y + offset + space * curvature,
        x + space - offset,
        y + space / 2
      )
      this.context.bezierCurveTo(
        x + space - offset,
        y + space - offset - space * curvature,
        x + space * (1 - curvature),
        y + space - offset,
        x + space / 2,
        y + space - offset
      )
      this.context.lineTo(x, y + space - offset)
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    this.context.restore()
  }
}

class PillPart {
  constructor(context, position, color, space) {
    this.context = context
    this.position = position
    this.color = color
    this.space = space
  }

  setPillPosition(position) {
    this.position = position
  }

  draw(){
    let x = this.position.x
    let y = this.position.y
    let space = this.space
    const lineWidth = this.space / 20
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';
    
    this.context.beginPath();
    this.context.arc(
      x + space / 2,
      y + space / 2,
      space / 2 - offset,
      0,
      Math.PI * 2
    )
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }
}

export default Pill
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
      switch (this.pillA.getPillOrientation()) {
        case "left":                    //[0, 0]
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
    } else {
      switch (this.pillA.getPillOrientation()) {
        case "left":                    //[0, 0]
        this.pillA.setPillPosition({    //[A, B]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("down")   //[B, 0]
        this.pillB.setPillPosition({    //[A, 0]
          x: this.position.x, y: this.position.y - this.size
        }).setPillOrientation("up")
        break
        case "down":                    //[B, 0]
        this.pillA.setPillPosition({    //[A, 0]
          x: this.position.x + this.size, y: this.position.y
        }).setPillOrientation("right")  //[0, 0]
        this.pillB.setPillPosition({    //[B, A]
          x: this.position.x, y: this.position.y
        }).setPillOrientation("left")
        break
        case "right":                   //[0, 0]
        this.pillA.setPillPosition({    //[B, A]
          x: this.position.x, y: this.position.y - this.size
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

export default Pill
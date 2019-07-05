class Pill {
  constructor (context, position, colors, size) {
    this.context = context
    this.position = position
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
}


class PillHalf {
  constructor (context, position, direction, color, size) {
    this.context = context
    this.position = position
    this.direction = direction // reversed for cartesian logic
    this.color = color
    this.attached = true
    this.size = size
  }

  getPillAngle(direction) {
    switch (direction) {
      case "up": return -90
      case "down": return 90
      case "left": return 180
      case "right": return 0
    }
  }
  

  drawPillHalf() {
    let x = this.position.x
    let y = this.position.y
    let size = this.size
    let degrees = this.getPillAngle(this.direction)
    let curvature = .225  //affects corners of capsule
    const lineWidth = 1
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


  drawPillPart(){
    let x = this.position.x
    let y = this.position.y
    let size = this.size
    const lineWidth = 1
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
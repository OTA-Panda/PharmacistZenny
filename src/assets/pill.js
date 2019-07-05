class Pill2 {
  constructor (context, position, direction, colors) {
    
    this.pillA = new PillHalf(context, position)
    this.pillB = new PillHalf(context, position)
  }
}


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
      case "up": return -90
      case "down": return 90
      case "left": return 180
      case "right": return 0
    }
  }
  

  drawPillHalf() {
    let x = this.position.x
    let y = this.position.y
    let width = 20
    let height = 20
    let degrees = this.getPillAngle(this.direction)
    let curvature = .225  //affects corners of capsule
    const lineWidth = 1
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';

    this.context.save()
      //rotate
      this.context.translate(x + width / 2, y + height / 2)
        this.context.rotate(Math.PI / 180 * degrees) // rotates clockwise
      this.context.translate(-x - width / 2, -y - height / 2)
      //render
      this.context.beginPath();
      this.context.moveTo(x, y + offset); // top left origin
      this.context.lineTo(x + width / 2, y + offset);
      this.context.bezierCurveTo(
        x + width * (1 - curvature),
        y + offset,  
        x + width - offset,
        y + offset + height * curvature,
        x + width - offset,
        y + height / 2
      )
      this.context.bezierCurveTo(
        x + width - offset,
        y + height - offset - height * curvature,
        x + width * (1 - curvature),
        y + height - offset,
        x + width / 2,
        y + height - offset
      )
      this.context.lineTo(x, y + height - offset)
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

export default Pill
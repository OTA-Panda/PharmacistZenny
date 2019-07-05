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

export default Pill
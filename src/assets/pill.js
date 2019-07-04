class PillHalf {
  constructor (context, orientation, colors, part) {
    this.context = context
    this.orientation = orientation
    this.color = colors[Math.random() * colors.length | 0]
    this.attached = true
    this.part = part
  }

  draw() {
    const lineWidth = 1
    const offset = lineWidth / 2
    this.context.fillStyle = this.color;
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.beginPath();
    this.context.moveTo(0 + offset, 0);
    this.context.lineTo(0 + offset, 10 + offset);
    this.context.bezierCurveTo(0 + offset, 22 + offset, 20 - offset, 22 + offset, 20 - offset, 10 + offset);
    this.context.lineTo(20 - offset, 0)
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
    
  }
}

export default PillHalf
const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 1
context.scale(scaleUp, scaleUp)

const lineWidth = 3
const offset = lineWidth / 2


context.fillStyle = 'red';
context.lineWidth = lineWidth;
context.strokeStyle = 'black';
context.beginPath();
context.beginPath();
context.moveTo(0 + offset, 0);
context.lineTo(0 + offset, 10 + offset);
context.bezierCurveTo(0 + offset, 25 + offset, 25 - offset, 25 + offset, 25 - offset, 10 + offset);
context.lineTo(25 - offset, 0)
context.closePath();
context.fill();
context.stroke();
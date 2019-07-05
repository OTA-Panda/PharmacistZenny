import Pill from './assets/pill'


const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 7
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','blue'] //temp


const pill1 = new Pill(context, { x: 0, y: 0 }, colors, 20)
// const pill2 = new Pill(context, { x: 0, y: 40 }, colors)
// const pill3 = new Pill(context, { x: 0, y: 60 }, colors)

pill1.draw()
// pill2.draw()
// pill3.draw()


import Pill from './assets/pill'


const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 7
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','blue'] //temp


const ph1 = new Pill(context, { x: 20, y: 10 }, "left", colors, 1)
const ph2 = new Pill(context, { x: 40, y: 10 }, "right",colors, -1)
const ph3 = new Pill(context, { x: 20, y: 30 }, "right",colors, -1)
const ph4 = new Pill(context, { x: 40, y: 30 }, "right",colors, -1)

ph1.drawPillHalf()
ph2.drawPillHalf()
ph3.drawPillPart()
ph4.drawPillPart()

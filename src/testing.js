import Pill from './assets/pill'


const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 7
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','blue'] //temp


const ph1 = new Pill(context, { x: 20, y: 20 }, "left", colors, 1)
const ph2 = new Pill(context, { x: 40, y: 20 }, "right",colors, -1)
const ph3 = new Pill(context, { x: 20, y: 40 }, "right",colors, -1)
const ph4 = new Pill(context, { x: 40, y: 40 }, "right",colors, -1)
const ph5 = new Pill(context, { x: 60, y: 20 }, "right",colors, -1)
const ph6 = new Pill(context, { x: 20, y: 0 }, "right",colors, -1)
const ph7 = new Pill(context, { x: 40, y: 0 }, "right",colors, -1)
const ph8 = new Pill(context, { x: 0, y: 20 }, "right",colors, -1)

ph1.drawPillHalf()
ph2.drawPillHalf()
ph3.drawPillPart()
ph4.drawPillPart()
ph5.drawPillPart()
ph6.drawPillPart()
ph7.drawPillPart()
ph8.drawPillPart()

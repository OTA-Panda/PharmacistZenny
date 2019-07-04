import PillHalf from './assets/pill'


const canvas = document.getElementById('zenny')
const context = canvas.getContext('2d')

const scaleUp = 7
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','blue'] //temp


const ph1 = new PillHalf(context,"up",colors,"A")
const ph2 = new PillHalf(context,"down",colors,"B")

ph1.draw()
ph2.draw()
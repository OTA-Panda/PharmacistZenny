import Pill from './game/pill'
import Bottle from './game/bottle'


const canvas = document.getElementById('bottle')
const context = canvas.getContext('2d')

const scaleUp = 5
const size = 10
context.scale(scaleUp, scaleUp)

const colors = ['red','yellow','deepskyblue', 'green'] //temp

console.log(canvas)
const bottle = new Bottle(context, size, 8, 16)
bottle.fillSpace(15 * size, 1 * size)
console.table(bottle.field)

const pill1 = new Pill(context, bottle.field, { x: 1 * size, y: 14 * size }, colors, size)
const pill2 = new Pill(context, bottle.field, { x: 0 * size, y: 6 * size }, colors, size)
const pill3 = new Pill(context, bottle.field, { x: 0 * size, y: 8 * size }, colors, size)

pill1.draw()
pill2.draw()
pill3.draw()
// console.log(`pill1 position: ${(JSON.stringify(pill1.position))}`)
console.log(`collision: ${pill1.hasCollision()}`)

setTimeout(() => {
  pill1.rotate(1)
  pill1.draw()
  setTimeout(() => {
    pill1.drop()
    pill1.draw()
    console.log(`collision: ${pill1.hasCollision()}`)
    console.log(`pill1 position: ${(JSON.stringify(pill1.position))}`)
    setTimeout(() => {
      // pill1.move(1)
      // pill1.drop()
      pill1.draw()
      console.log(`collision: ${pill1.hasCollision()}`)
      console.log(`pill1 position: ${(JSON.stringify(pill1.position))}`)
      setTimeout(() => {
        pill1.rotate(-1)
        pill1.move(-1)
        pill1.draw()
      }, 1000)
    }, 2000)
  }, 1000)
}, 1000)


import { hsla } from "./utilities.js"

const drawSquare = (ctx, position, velocity, { width, height }, hue) => {
  const color = hsla(hue, "100%", "50%", 0.75)
  ctx.save()
  ctx.fillStyle = color
  ctx.translate(position.x, position.y)
  ctx.rotate(velocity.direction())
  ctx.fillRect(-width / 2, -height / 2, width, height)
  ctx.restore()
}

const drawTriangle = (ctx, position, velocity, { width }, hue) => {
  const color = hsla(hue, "100%", "50%", 0.75)

  ctx.save()
  ctx.fillStyle = color
  ctx.translate(position.x, position.y)
  ctx.rotate(velocity.direction())

  ctx.beginPath()
  ctx.moveTo(width, 0)
  ctx.lineTo(0, -width / 4)
  ctx.lineTo(0, width / 4)
  ctx.closePath()

  ctx.fill()
  ctx.restore()
}

const drawVelocity = (ctx, position, v, hue) => {
  const color = hsla(hue, "100%", "50%", 0.5)

  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(position.x, position.y)
  ctx.lineTo(v.x, v.y)
  ctx.stroke()
  ctx.restore()
}

const drawSpring = (ctx, { width, height }, position, hue) => {
  const color = hsla(hue, "100%", "50%", 0.5)

  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(width / 2, height / 2)
  ctx.lineTo(position.x, position.y)
  ctx.stroke()
  ctx.restore()
}

const drawCircle = (ctx, { perception }, position, hue) => {
  const color = hsla(hue, "100%", "50%", 0.25)
  const color1 = hsla(hue, "100%", "50%", 0.1)

  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(position.x, position.y, perception, 0, Math.PI * 2, false)
  ctx.stroke()
  ctx.fillStyle = color1
  ctx.fill()
  ctx.restore()
}

const drawNeighbor = (ctx, p1, hue) => p2 => {
  const color = hsla(hue, "100%", "50%", 0.25)

  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
  ctx.restore()
}

export const render = (store, ctx) => ({
  velocity,
  position,
  traits,
  neighbors,
}) => {
  const hue = Math.floor(traits.hue + parseInt(store.hueOffset))

  drawSpring(ctx, store, position, hue)

  if (store.shapes[store.shape] === "square")
    drawSquare(ctx, position, velocity, traits, hue)

  if (store.shapes[store.shape] === "triangle")
    drawTriangle(ctx, position, velocity, traits, hue)

  if (store.showVelocity) drawVelocity(ctx, position, velocity, hue)

  if (store.showPerception) drawCircle(ctx, store, position, hue)

  if (store.showNeighbors)
    neighbors.map(x => x.position).forEach(drawNeighbor(ctx, position, hue))
}

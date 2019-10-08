import { randVector } from "./utilities.js"
import { Vector } from "./models/Vector.js"
//the cap the maximum time delta so that long periods in between frames
//doesn't move our particles off the screen
const capTime = (cap, t) => (t > cap ? cap : t)

// generate some jitter to make the movement more organic
const jitter = j => randVector(-j, j)

// limit the maximum acceleration
const limit = p => {
  const x = p.x < 0 ? Math.max(p.x, -0.005) : Math.min(p.x, 0.005)
  const y = p.y < 0 ? Math.max(p.y, -0.005) : Math.min(p.y, 0.005)
  return p.with({ x, y })
}

//velocity = a * t
const velocity = (a, t) => a.mul(t)

//position = p0 + v * t + 0.5 * a * t^2
const position = (i, a, v, t) =>
  i.add(v.mul(t)).add(a.mul(0.5).mul(Math.pow(t, 2)))

//reverses the acceleration vector if the particle's position is out-of-bounds
const bouncyBounds = ({ width, height }, p, v) => {
  const vx = p.x < 0 ? Math.abs(v.x) : p.x > width ? -Math.abs(v.x) : v.x
  const vy = p.y < 0 ? Math.abs(v.y) : p.y > height ? -Math.abs(v.y) : v.y
  return v.with({ x: vx, y: vy })
}

//warps the particle to the other boundary side
const portalBounds = ({ width, height }, p) => {
  const vx = p.x < 0 ? width - 1 : p.x > width ? 1 : p.x
  const vy = p.y < 0 ? height + p.y : p.y > height ? height - p.y : p.y
  return p.with({ x: vx, y: vy })
}

const hooksLaw = k => distance => k * distance

const dampingLaw = b => velocity => b * velocity

export const particleEngine = (store, t) => particle => {
  let spring =
    store.springK < 0
      ? store.springK
      : Number((store.springK / 100000) * -9).toFixed(4)
  let damping =
    store.dampingB < 0
      ? store.dampingB
      : Number((store.dampingB / 100000) * -9).toFixed(4)

  const deltaLength = particle.position.sub(
    Vector.of(store.width / 2, store.height / 2)
  )

  const springForce = deltaLength.mul(spring)
  const dampingForce = particle.velocity.mul(damping)

  const forces = springForce.add(dampingForce).div(store.mass)
  // console.log(forces)
  const t1 = capTime(40, t)
  const i = particle.position
  const a = particle.acceleration.add(forces)

  const v = velocity(a, t1)
  const p = position(i, a, v, t1)
  // const p1 = portalBounds(store, p)
  const q = particle.with({
    acceleration: a,
    velocity: v,
    position: p,
  })
  return q
}

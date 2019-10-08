import { Particle, Vector, Trait } from "./models/index.js"

export const rand = (min, max) => Math.random() * (max - min) + min

export const randVector = (min, max) =>
  Vector.of(rand(min, max), rand(min, max))

export const range = size => [...Array(size).keys()]

export const hsla = (h, s, l, a) => `hsla(${h}, ${s}, ${l}, ${a})`

export const gen = ({
  width,
  height,
  minAcceleration,
  maxAcceleration,
  count,
  mass,
}) => i => {
  const a = Vector.of(0, 0)
  const v = Vector.of(0, 0)
  const p = Vector.of(rand(0, width), rand(0, height))
  const m = mass
  const h = (i / count) * 50
  const t = Trait.of(10, 10, m, h)

  return Particle.of(a, v, p, [], t)
}

export const generate = store => range(store.count).map(gen(store))

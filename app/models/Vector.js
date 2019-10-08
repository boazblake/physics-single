export class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static of(x, y) {
    return new Vector(x, y)
  }

  with({ x, y }) {
    return Vector.of(x || this.x, y || this.y)
  }

  add(v) {
    return Vector.of(this.x + v.x, this.y + v.y)
  }

  sub(v) {
    return Vector.of(this.x - v.x, this.y - v.y)
  }

  mul(c) {
    return Vector.of(this.x * c, this.y * c)
  }

  div(c) {
    return c === 0 ? this : Vector.of(this.x / c, this.y / c)
  }

  lt(v) {
    return v.x < this.x || v.y < this.y
  }

  gt(v) {
    return v.x > this.x || v.y > this.y
  }

  clone() {
    return Vector.of(this.x, this.y)
  }

  max(p) {
    return this.gt(p) ? this : p
  }

  min(p) {
    return this.lt(p) ? this : p
  }

  direction() {
    return Math.atan2(this.y, this.x)
  }

  magSq() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2)
  }

  mag() {
    return Math.sqrt(this.magSq())
  }

  normalize() {
    return this.div(this.mag())
  }
}

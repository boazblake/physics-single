const shapes = ["triangle", "square"]

const store = {
  count: 1,
  width: 600,
  height: 600,
  minAcceleration: 0.001,
  maxAcceleration: 0.005,
  jitter: 0.01,
  hueOffset: 240,
  perception: 40,
  showPerception: true,
  showVelocity: false,
  springK: 1,
  dampingB: 1,
  mass: 50,
  shape: 0,
  shapes,
}

export default store

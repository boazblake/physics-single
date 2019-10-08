export class Particle {
  constructor(acceleration, velocity, position, neighbors, traits) {
    this.acceleration = acceleration;
    this.velocity = velocity;
    this.position = position;
    this.neighbors = neighbors;
    this.traits = traits;
  }

  static of(acceleration, velocity, position, neighbors, traits) {
    return new Particle(acceleration, velocity, position, neighbors, traits);
  }

  with({ acceleration, velocity, position, neighbors }) {
    return Particle.of(
      acceleration || this.acceleration,
      velocity || this.velocity,
      position || this.position,
      neighbors || this.neighbors,
      this.traits
    );
  }
}

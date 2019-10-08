import { Vector } from "./models/Vector.js";

const excludeSelf = (particles, particle) =>
  particles.filter(x => x !== particle);

const distanceSquared = (p1, p2) =>
  Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

// this we square the minimum distance as an optimization to square rooting the distance.
const nearestNeighborByDistance = (particles, minDistance, p1) =>
  particles.filter(
    p2 => distanceSquared(p1.position, p2.position) < Math.pow(minDistance, 2)
  );

const nearestNeighborByCount = (particles, count, p1) => {
  const byDistance = (a, b) =>
    a.distance < b.distance ? -1 : b.distance > a.distance ? 1 : 0;

  return particles
    .map(p2 => ({ particle: p2, distance: distance(p1.position, p2.position) }))
    .sort(byDistance)
    .slice(0, count)
    .map(x => x.particle);
};

const avg = vectors =>
  vectors
    .reduce((acc, x) => acc.add(x), Vector.of(0, 0))
    .div(vectors.length || 1); //guard against division by 0

const separate = (separationFactor, xs, x) =>
  xs
    .reduce((acc, y) => acc.add(x.sub(y)), Vector.of(0, 0))
    .normalize()
    .mul(separationFactor);

const align = (alignmentFactor, xs) =>
  avg(xs)
    .normalize()
    .mul(alignmentFactor);

const coerce = (cohesionFactor, xs, x) =>
  avg(xs)
    .sub(x)
    .normalize()
    .mul(cohesionFactor);

export const groupEngine = (
  { perception, separationFactor, alignmentFactor, cohesionFactor },
  particles
) =>
  particles.map(p => {
    const ps = excludeSelf(particles, p);
    const ns = nearestNeighborByDistance(ps, perception, p);

    const accelerations = ns.map(x => x.acceleration);
    const positions = ns.map(x => x.position);

    const alignment = align(alignmentFactor, accelerations);
    const separation = separate(separationFactor, positions, p.position);
    const cohesion = coerce(cohesionFactor, positions, p.position);

    const a = p.acceleration
      .add(separation)
      .add(alignment)
      .add(cohesion);

    return p.with({ acceleration: a, neighbors: ns });
  });

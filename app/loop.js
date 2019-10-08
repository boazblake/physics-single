export const loop = (global, init, f) => {
  let stop = false;
  let accumulator = init;
  let time0 = 0;
  let time1 = 0.001;

  global.addEventListener("keydown", () => {
    stop = !stop;
    if (!stop) go(accumulator, time0)(time1);
  });

  const go = (acc, t0) => t1 => {
    accumulator = acc;
    time0 = t0;
    time1 = t1;
    if (!stop) window.requestAnimationFrame(go(f(acc, t1 - t0), t1));
  };

  go(accumulator, time0)(time1);
};

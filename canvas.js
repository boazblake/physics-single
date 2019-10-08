import m from "mithril"

import { loop } from "./app/loop.js"
import { particleEngine } from "./app/particleEngine.js"
import { render } from "./app/render.js"
import { generate } from "./app/utilities.js"

export const update = (ctx, store) => (ps, time) => {
  ctx.clearRect(0, 0, 600, 600)
  const pps = ps.map(particleEngine(store, time))
  pps.forEach(render(store, ctx))
  return pps
}

const Canvas = () => {
  return {
    oncreate: ({ dom, attrs: { store } }) => {
      dom.width = store.width
      dom.height = store.height
      loop(window, generate(store), update(dom.getContext("2d"), store))
    },
    view: () => m("canvas", { id: "canvas" }),
  }
}

export default Canvas

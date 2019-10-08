import m from "mithril"

import Controls from "./controls.js"
import Canvas from "./canvas.js"

const App = ({ attrs: { store } }) => {
  return {
    view: () => m(".app", [m(Canvas, { store }), m(Controls, { store })]),
  }
}

export default App

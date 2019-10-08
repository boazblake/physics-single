import m from "mithril"

const Slider = () => {
  return {
    view: ({ attrs: { store, label, id, min, max, step } }) =>
      m(".slider", [
        m("label", { for: id }, label),
        m("input", {
          type: "range",
          name: id,
          id,
          min,
          max,
          step,
          value: store[id],
          oninput: e => (store[id] = e.target.value),
        }),
        m(
          "span",
          ["springK", "dampingB"].includes(id)
            ? Number((store[id] / 100000) * -9).toFixed(4)
            : store[id]
        ),
      ]),
  }
}

const Toggle = () => {
  return {
    view: ({ attrs: { store, label, id } }) =>
      m(".toggle", {}, [
        m("input", {
          id,
          type: "checkbox",
          name: id,
          checked: store[id],
          onclick: e => (store[id] = !store[id]),
        }),
        m("label", { for: id }, label),
      ]),
  }
}

const Controls = ({ attrs: { store } }) => {
  return {
    view: ({ attrs: { store } }) =>
      m("section.controls", [
        m(Slider, {
          label: "Mass",
          id: "mass",
          min: "1",
          max: "100",
          store,
          step: "1",
        }),
        m(Slider, {
          label: "Spring Force",
          id: "springK",
          min: "1",
          max: "100",
          store,
          step: "1",
        }),
        m(Slider, {
          label: "Damping",
          id: "dampingB",
          min: "1",
          max: "100",
          store,
          step: "1",
        }),
        m(Slider, {
          label: "Perception",
          id: "perception",
          min: "0",
          max: "100",
          store,
          step: "1",
        }),
        m(Slider, {
          label: "Hue",
          id: "hueOffset",
          min: "0",
          max: "360",
          store,
          step: "1",
        }),
        m(Slider, {
          label: "Height",
          id: "height",
          min: "10",
          max: "600",
          store,
          step: "10",
        }),
        m(Slider, {
          label: "Width",
          id: "width",
          min: "10",
          max: "600",
          store,
          step: "10",
        }),
        m(Toggle, {
          label: "Show Perception",
          id: "showPerception",
          store,
        }),
        m(
          "select",
          {
            onchange: e => (store.shape = e.target.value),
          },
          store.shapes.map((shape, key) =>
            m("option", { key, value: key }, shape)
          )
        ),
      ]),
  }
}

export default Controls

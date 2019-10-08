import m from "mithril"
import store from "./store.js"
import App from "./app.js"

const root = document.body

import "./styles.css"

m.mount(root, { view: () => m(App, { store }) })

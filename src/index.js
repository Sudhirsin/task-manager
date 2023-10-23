import React from "react"
import ReactDOM from "react-dom"

import "bootstrap/dist/css/bootstrap.min.css"

import App from "./App"
import { TaskProvider } from "./contexts/TaskContext"

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

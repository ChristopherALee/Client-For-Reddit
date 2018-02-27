import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Root";
import configureStore from "./store/store";
import registerServiceWorker from "./registerServiceWorker";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
  registerServiceWorker();
});

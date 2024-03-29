import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { ProvideAuth } from "./firebase/auth";
const mountNode = document.getElementById("app");
ReactDOM.render(
  <ProvideAuth>
    <App />
  </ProvideAuth>,
  mountNode
);

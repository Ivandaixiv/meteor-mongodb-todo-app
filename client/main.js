import React from "react";
import ReactDOM from "react-dom";

import App from "../imports/ui/containers/App";
import * as serviceWorker from "./serviceWorker";
import { Meteor } from "meteor/meteor";
import "./main.html";
import "./main.css";

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

serviceWorker.unregister();

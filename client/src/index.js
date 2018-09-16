import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import HttpsRedirect from "react-https-redirect";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/index.css";
import "./styles/App.css";
import "./styles/Quran.css";
import "./styles/Navbar.css";
import "./styles/UpperSixth.css";

import store from "./store.js";

import App from "./containers/App";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <HttpsRedirect>
          <div className="container main_app">
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </div>
      </HttpsRedirect>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

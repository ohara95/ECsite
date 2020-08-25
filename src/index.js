import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integrantion/react";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Appをラップして常に永続化フロー自体にアクセスできるようにする */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

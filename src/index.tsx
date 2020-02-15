import * as serviceWorker from './serviceWorker';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// TODO: make this proper
import { createStore, Reducer, AnyAction } from "redux";

import Routes from "./routes";

const noopReducer: Reducer<any, AnyAction> = state => state;
const store = createStore(noopReducer);

const rootEl = document.getElementById("root");

const render = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <Provider store={store}>
            <Component />
    </Provider>,
    rootEl,
  );
};

render(Routes);

if ((module as any).hot) {
  (module as any).hot.accept("./routes", (): void => {
    const NextApp = require("./routes").default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

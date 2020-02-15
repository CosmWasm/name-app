import * as serviceWorker from './serviceWorker';

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Routes from "./routes";
import { SdkProvider } from "./service"

const rootEl = document.getElementById("root");

const render = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <SdkProvider>
      <App>
        <Component />
      </App>
    </SdkProvider>,
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

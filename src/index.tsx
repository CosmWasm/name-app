import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import Splash from "./components/Splash";
import { config } from "./config";
import Routes from "./routes";
import { BurnerWalletProvider, ErrorProvider } from "./service";
import * as serviceWorker from "./serviceWorker";

const rootEl = document.getElementById("root");

const render = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <ErrorProvider>
      <BurnerWalletProvider config={config}>
        <Splash>
          <Component />
        </Splash>
      </BurnerWalletProvider>
    </ErrorProvider>,
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

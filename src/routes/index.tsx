import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router";

import Root from "./root";
import Details from "./details";

export const history = createBrowserHistory();

const Routes = (): JSX.Element => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/contract/:address" component={Details} />
    </Switch>
  </Router>
);

export default Routes;

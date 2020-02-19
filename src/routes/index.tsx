import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router";

import ContractList from "../components/ContractList";
import Details from "./details";

export const history = createBrowserHistory();

const Routes = (): JSX.Element => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={ContractList} />
      <Route exact path="/contract/:address" component={Details} />
    </Switch>
  </Router>
);

export default Routes;

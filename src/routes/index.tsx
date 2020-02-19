import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router";

import { Header } from "../components/App";
import ContractList from "../components/ContractList";
import Details from "./details";

export const history = createBrowserHistory();

const Routes = (): JSX.Element => (
  <Router history={history}>
    <Header>
      <Switch>
        <Route exact path="/" component={ContractList} />
        <Route exact path="/contract/:address" component={Details} />
      </Switch>
    </Header>
  </Router>
);

export default Routes;

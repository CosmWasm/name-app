import React from "react";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";

import { Header } from "../components/App";
import ContractList from "../components/ContractList";
import Details from "./details";

const Routes = (): JSX.Element => (
  <HashRouter basename="/" >
    <Header>
      <Switch>
        <Route exact path="/" component={ContractList} />
        <Route path="/contract/:address" component={Details} />
      </Switch>
    </Header>
  </HashRouter>
);

export default Routes;

import React from "react";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";

import ContractList from "../components/ContractList";
import HeaderLogic from "../components/HeaderLogic";
import Details from "./details";

const Routes = (): JSX.Element => (
  <HashRouter basename="/" >
      <HeaderLogic />
      <Switch>
        <Route exact path="/" component={ContractList} />
        <Route path="/contract/:address" component={Details} />
      </Switch>
  </HashRouter>
);

export default Routes;

import React from "react";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";

import ContractList from "../components/ContractList";
import ErrorLogic from "../components/ErrorLogic";
import HeaderLogic from "../components/HeaderLogic";

import Details from "./details";

const Routes = (): JSX.Element => (
  <HashRouter basename="/" >
      <HeaderLogic />
      <ErrorLogic />
      <Switch>
        <Route exact path="/" component={ContractList} />
        <Route path="/contract/:address" component={Details} />
      </Switch>
  </HashRouter>
);

export default Routes;

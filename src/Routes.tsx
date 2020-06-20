import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { PageNotFound404 } from "./PresentationalComponents/PageNotFound404";
import { PageOrganizations } from "./PresentationalComponents/PageOrganizations";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/organizations" component={PageOrganizations} />
      <Route path="/keys" component={PageOrganizations} />
      <Route path="/error-404" component={PageNotFound404} />
      <Redirect from="/" to="/organizations" exact />
    </Switch>
  );
};

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { PageNotFound404 } from "./PresentationalComponents/PageNotFound404";
import { PageOrganizations } from "./PresentationalComponents/PageOrganizations";
import { PageOrganizationContext } from "./PresentationalComponents/PageOrganizationContext";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/organizations" component={PageOrganizations} />
      <Route
        path="/server/org/:organizationId"
        component={PageOrganizationContext}
      />
      <Route path="/error-404" component={PageNotFound404} />
      <Redirect from="/" to="/organizations" exact />
    </Switch>
  );
};

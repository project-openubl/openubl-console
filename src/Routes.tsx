import React from "react";
import { Route, Switch } from "react-router-dom";

import { PageNotFound404 } from "./pages";
import { PageOrganizationList } from "./PresentationalComponents/PageOrganizationList";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={PageOrganizationList} exact />
      <Route path="/organizations/list" component={PageOrganizationList} />
    </Switch>
  );
};

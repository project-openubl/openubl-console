import React from "react";
import { Route, Switch } from "react-router-dom";

import { PageNotFound404 } from "./PresentationalComponents/PageNotFound404";
import { PageOrganizationList } from "./PresentationalComponents/PageOrganizationList";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={PageOrganizationList} exact />
      <Route path="/organizations/list" component={PageOrganizationList} />
      <Route path="/error-404" component={PageNotFound404} />
    </Switch>
  );
};

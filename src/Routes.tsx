import React from "react";
import { Route, Switch } from "react-router-dom";

import { PageNotFound404 } from "./pages";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={PageNotFound404} />
    </Switch>
  );
};

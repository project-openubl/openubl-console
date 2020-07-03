import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AppPlaceholder } from "./PresentationalComponents/Components/AppPlaceholder";

const PageOrganizations = lazy(() =>
  import("./PresentationalComponents/PageOrganizations")
);
const PageNotFound404 = lazy(() =>
  import("./PresentationalComponents/PageNotFound404")
);
const PageOrganizationContext = lazy(() =>
  import("./PresentationalComponents/PageOrganizationContext")
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<AppPlaceholder />}>
      <Switch>
        <Route path="/organizations" component={PageOrganizations} />
        <Route
          path="/server/org/:organizationId"
          component={PageOrganizationContext}
        />
        <Route path="/error-404" component={PageNotFound404} />
        <Redirect from="/" to="/organizations" exact />
      </Switch>
    </Suspense>
  );
};

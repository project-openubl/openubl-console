import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageKeys } from "./PageKeys";
import { PageDocuments } from "./PageDocuments";
import OrganizationContextLoader from "../../SmartComponents/Context/OrganizationContextLoader";

export const PageOrganizationContext: React.FC = () => {
  return (
    <OrganizationContextLoader>
      <Switch>
        <Route path="/server/org/:organizationId/keys" component={PageKeys} />
        <Route
          path="/server/org/:organizationId/documents"
          component={PageDocuments}
        />
      </Switch>
    </OrganizationContextLoader>
  );
};

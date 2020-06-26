import React from "react";
import { Switch, Route } from "react-router-dom";
import { KeyList } from "./PageKeyList";
import { PageCreateKey } from "./PageCreateKey";
import { OrganizationContextPageSection } from "../OrganizationContextPageSection";
import { OrganizationRepresentation } from "../../../models/api";
import { AppRouterProps } from "../../../models/routerProps";

export interface PageKeysProps extends AppRouterProps {}

export const PageKeys: React.FC<PageKeysProps> = ({ history: { push } }) => {
  const onOrganizationContextChange = (
    organization: OrganizationRepresentation
  ) => {
    push(`/server/org/${organization.id}/keys`);
  };

  return (
    <React.Fragment>
      <OrganizationContextPageSection onSelect={onOrganizationContextChange} />
      <Switch>
        <Route
          path="/server/org/:organizationId/keys"
          component={KeyList}
          exact
        />
        <Route
          path="/server/org/:organizationId/keys/~new/:providerId"
          component={PageCreateKey}
        />
        <Route
          path="/server/org/:organizationId/keys/:keyId/:providerId"
          component={PageCreateKey}
        />
      </Switch>
    </React.Fragment>
  );
};

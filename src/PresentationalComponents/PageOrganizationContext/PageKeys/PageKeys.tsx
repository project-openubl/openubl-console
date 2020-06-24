import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageActiveKey } from "./PageActiveKey";
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
        <Route path="/server/org/:organizationId/keys" component={KeyList} />
        <Route
          path="/server/org/:organizationId/keys/~new"
          component={PageCreateKey}
        />
        <Route
          path="/server/org/:organizationId/keys/~active"
          component={PageActiveKey}
          exact
        />
        <Route
          path="/server/org/:organizationId/keys/:keyId"
          component={PageActiveKey}
          exact
        />
      </Switch>
    </React.Fragment>
  );
};

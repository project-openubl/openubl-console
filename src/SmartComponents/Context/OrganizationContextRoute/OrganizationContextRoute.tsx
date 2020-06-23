import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { OrganizationRepresentation } from "../../../models/api";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  ctxOrganization: OrganizationRepresentation | undefined;
  ctxOrganizations: OrganizationRepresentation[] | undefined;
}

interface DispatchToProps {
  selectCtxOrganization: (organization: OrganizationRepresentation) => any;
  fetchOrganizations: () => void;
}

interface OrganizationContextRouteProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {}

export const OrganizationContextRoute: React.FC<OrganizationContextRouteProps> = ({
  history: { push },
  ctxOrganizations,
  fetchOrganizations,
  selectCtxOrganization,
}) => {
  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (ctxOrganizations && ctxOrganizations.length > 0) {
      selectCtxOrganization(ctxOrganizations[0]);
      push();
    }
  }, [ctxOrganizations, selectCtxOrganization, push]);

  return <Redirect from="" to="" />;
};

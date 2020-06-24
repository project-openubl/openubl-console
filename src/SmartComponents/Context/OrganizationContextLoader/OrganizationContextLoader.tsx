import React, { useEffect } from "react";
import { OrganizationRepresentation } from "../../../models/api";

interface StateToProps {
  ctxOrganizations: OrganizationRepresentation[] | undefined;
}

interface DispatchToProps {
  fetchOrganizations: () => void;
}

interface OrganizationContextRouteProps extends StateToProps, DispatchToProps {
  children: any;
}

export const OrganizationContextLoader: React.FC<OrganizationContextRouteProps> = ({
  children,
  ctxOrganizations,
  fetchOrganizations,
}) => {
  useEffect(() => {
    fetchOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{ctxOrganizations ? children : ""}</React.Fragment>;
};

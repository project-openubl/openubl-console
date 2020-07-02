import React from "react";
import { NavLink } from "react-router-dom";
import { OrganizationRepresentation } from "../../../models/api";

interface StateToProps {
  contextOrganization: OrganizationRepresentation | undefined;
  contextOrganizations: OrganizationRepresentation[] | undefined;
}

interface DispatchToProps {}

interface OrganizationContextNavLinkProps
  extends StateToProps,
    DispatchToProps {
  to: string;
  activeClassName: string;
  children: any;
}

export const OrganizationContextNavLink: React.FC<OrganizationContextNavLinkProps> = ({
  to,
  activeClassName,
  children,
  contextOrganization,
  contextOrganizations,
}) => {
  return (
    <NavLink
      to={to.replace(
        ":organizationId",
        contextOrganization
          ? contextOrganization.id
          : (contextOrganizations || []).length > 0
          ? (contextOrganizations || [])[0].id
          : "master"
      )}
      activeClassName={activeClassName}
      className="pf-c-nav__link"
    >
      {children}
    </NavLink>
  );
};

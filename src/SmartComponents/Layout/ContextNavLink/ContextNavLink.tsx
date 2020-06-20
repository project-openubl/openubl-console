import React from "react";
import { NavLink } from "react-router-dom";
import { OrganizationRepresentation } from "../../../models/api";

interface StateToProps {
  contextOrganization: OrganizationRepresentation | undefined;
}

interface DispatchToProps {}

interface ContextNavLinkProps extends StateToProps, DispatchToProps {
  to: string;
  activeClassName: string;
  children: any;
}

export const ContextNavLink: React.FC<ContextNavLinkProps> = ({
  to,
  activeClassName,
  children,
  contextOrganization,
}) => {
  return (
    <NavLink
      to={contextOrganization ? `${to}/${contextOrganization.id}` : to}
      activeClassName={activeClassName}
      className="pf-c-nav__link"
    >
      {children}
    </NavLink>
  );
};

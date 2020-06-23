import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavGroup } from "@patternfly/react-core";
import OrganizationContextNavLink from "../../../SmartComponents/Context/OrganizationContextNavLink";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavGroup title="General">
          <NavItem>
            <NavLink to="/organizations" activeClassName="pf-m-current">
              Organizaciones
            </NavLink>
          </NavItem>
          <NavItem>
            <OrganizationContextNavLink
              to="/keys/org/:organizationId"
              activeClassName="pf-m-current"
            >
              Certificados
            </OrganizationContextNavLink>
          </NavItem>
        </NavGroup>
        <NavGroup title="Aplicación">
          <NavItem>
            <OrganizationContextNavLink
              to="/documents"
              activeClassName="pf-m-current"
            >
              Documentos
            </OrganizationContextNavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme="dark" />;
};

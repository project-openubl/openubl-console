import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavGroup } from "@patternfly/react-core";
import ContextNavLink from "../../../SmartComponents/Layout/ContextNavLink";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavGroup title="General">
          <NavItem>
            <NavLink to="/" activeClassName="pf-m-current">
              Organizaciones
            </NavLink>
          </NavItem>
          <NavItem>
            <ContextNavLink to="/keys" activeClassName="pf-m-current">
              Certificados
            </ContextNavLink>
          </NavItem>
        </NavGroup>
        <NavGroup title="Aplicación">
          <NavItem>
            <ContextNavLink to="/documents" activeClassName="pf-m-current">
              Documentos
            </ContextNavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme="dark" />;
};

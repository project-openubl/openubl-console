import React from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavList,
  PageSidebar,
  NavGroup,
} from "@patternfly/react-core";

interface Props {}

interface State {}

export const SidebarApp: React.FC<Props> = ({ children }) => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavGroup title="General">
          <NavItem>
            <NavLink to="/" activeClassName="pf-m-current">
              Organizaciones
            </NavLink>
          </NavItem>
          <NavItem itemId={0}>
            <NavLink to="/menu2" activeClassName="pf-m-current">
              Documentos
            </NavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme="dark" />;
};

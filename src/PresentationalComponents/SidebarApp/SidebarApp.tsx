import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavGroup } from "@patternfly/react-core";
import { HomeIcon } from "@patternfly/react-icons";

interface Props {}

export const SidebarApp: React.FC<Props> = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavItem>
          <a
            href="https://project-openubl.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HomeIcon />
            &nbsp;Documentación
          </a>
        </NavItem>
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

import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavList, PageSidebar } from "@patternfly/react-core";

interface Props {}

interface State {}

export class SidebarApp extends React.Component<Props, State> {
  renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavList>
          <NavItem>
            <NavLink to="/" activeClassName="pf-m-current">
              Menu1
            </NavLink>
          </NavItem>
          <NavItem itemId={0}>
            <NavLink to="/menu2" activeClassName="pf-m-current">
              Menu2
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
    );
  };

  render() {
    return <PageSidebar nav={this.renderPageNav()} theme="dark" />;
  }
}

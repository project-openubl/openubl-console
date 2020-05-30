import * as React from "react";
import {
  PageHeader,
  Brand,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";
import accessibleStyles from "@patternfly/react-styles/css/utilities/Accessibility/accessibility";

import navBrandImage from "../../brand.svg";
import { ButtonAboutApp } from "../ButtonAboutApp";

export interface HeaderProps {}

interface State {}

export class HeaderApp extends React.Component<HeaderProps, State> {
  renderPageToolbar = () => {
    return (
      <React.Fragment>
        <Toolbar>
          <ToolbarGroup
            className={css(
              accessibleStyles.screenReader,
              accessibleStyles.visible
            )}
          >
            <ToolbarItem>
              <ButtonAboutApp />
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <PageHeader
        logo={<Brand src={navBrandImage} alt="brand" />}
        toolbar={this.renderPageToolbar()}
        showNavToggle
      />
    );
  }
}

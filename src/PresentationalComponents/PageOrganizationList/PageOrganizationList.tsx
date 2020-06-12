import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import OrganizationList from "../../SmartComponents/OrganizationList";

interface Props {}

interface State {}

export class PageOrganizationList extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Organizaciones</Text>
          </TextContent>
        </PageSection>
        <PageSection>
          <OrganizationList />
        </PageSection>
      </React.Fragment>
    );
  }
}

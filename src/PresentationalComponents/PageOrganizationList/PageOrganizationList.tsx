import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import OrganizationList from "../../SmartComponents/OrganizationList";

export const PageOrganizationList: React.FC = () => {
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
};

import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import CreateOrganization from "../../../SmartComponents/Organizations/CreateOrganization";

export interface PageCreateOrganizationProps extends AppRouterProps {}

export const PageCreateOrganization: React.FC<PageCreateOrganizationProps> = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Crear organización</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <CreateOrganization />
      </PageSection>
    </React.Fragment>
  );
};

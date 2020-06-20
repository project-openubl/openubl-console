import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import CreateOrganizationWizard from "../../../SmartComponents/CreateOrganizationWizard";

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
        <CreateOrganizationWizard />
      </PageSection>
    </React.Fragment>
  );
};

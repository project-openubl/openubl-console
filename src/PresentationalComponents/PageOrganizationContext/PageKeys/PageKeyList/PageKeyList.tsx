import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../../models/routerProps";
import KeyList from "../../../../SmartComponents/Keys/KeyList";

interface PageKeyListProps extends AppRouterProps {}

export const PageKeyList: React.FC<PageKeyListProps> = ({ match }) => {
  const organizationId = match.params.organizationId;

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Certificados</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <KeyList organizationId={organizationId} />
      </PageSection>
    </React.Fragment>
  );
};

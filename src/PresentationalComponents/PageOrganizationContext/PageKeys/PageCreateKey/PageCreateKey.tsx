import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import CreateKey from "../../../../SmartComponents/Keys/CreateKey";

export interface PageCreateKeyProps {
  organizationId: string;
}

export const PageCreateKey: React.FC<PageCreateKeyProps> = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Crear certificado</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <CreateKey />
      </PageSection>
    </React.Fragment>
  );
};

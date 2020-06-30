import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import CreateKey from "../../../../SmartComponents/Keys/CreateKey";
import { AppRouterProps } from "../../../../models/routerProps";

export interface PageCreateKeyProps extends AppRouterProps {}

export const PageCreateKey: React.FC<PageCreateKeyProps> = ({
  match: { params },
}) => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Crear certificado</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <CreateKey
          organizationId={params.organizationId}
          providerId={params.providerId}
        />
      </PageSection>
    </React.Fragment>
  );
};

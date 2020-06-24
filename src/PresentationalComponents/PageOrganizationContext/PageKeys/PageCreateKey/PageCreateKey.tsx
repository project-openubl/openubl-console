import React from "react";
import { PageSection } from "@patternfly/react-core";

export interface PageCreateKeyProps {
  organizationId: string;
}

export const PageCreateKey: React.FC<PageCreateKeyProps> = () => {
  return (
    <React.Fragment>
      <PageSection>
        <p>PageCreateKey</p>
      </PageSection>
    </React.Fragment>
  );
};

import React from "react";
import { PageSection } from "@patternfly/react-core";

export interface PageActiveKeyProps {
  organizationId: string;
}

export const PageActiveKey: React.FC<PageActiveKeyProps> = () => {
  return (
    <React.Fragment>
      <PageSection>
        <p>Active key</p>
      </PageSection>
    </React.Fragment>
  );
};

import React from "react";
import {
  PageSection,
  PageSectionVariants,
  Divider,
} from "@patternfly/react-core";
import OrganizationContextSelector from "../../../SmartComponents/Context/OrganizationContextSelector";

export const PageDocuments: React.FC = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light} style={{ padding: 0 }}>
        <div className="pf-c-page__main-section">
          <OrganizationContextSelector onSelect={() => {}} />
        </div>
        <Divider />
      </PageSection>
      <PageSection>Page documents</PageSection>
    </React.Fragment>
  );
};

import React from "react";
import {
  PageSection,
  PageSectionVariants,
  Divider,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../models/api";
import OrganizationContextSelector from "../../../SmartComponents/Context/OrganizationContextSelector";

export interface OrganizationContextPageSectionProps {
  onSelect: (organization: OrganizationRepresentation) => any;
}

export const OrganizationContextPageSection: React.FC<OrganizationContextPageSectionProps> = ({
  onSelect,
}) => {
  return (
    <PageSection variant={PageSectionVariants.light} style={{ padding: 0 }}>
      <Stack>
        <StackItem
          className="pf-c-page__main-section"
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <OrganizationContextSelector onSelect={onSelect} />
        </StackItem>
        <StackItem>
          <Divider />
        </StackItem>
      </Stack>
    </PageSection>
  );
};

import React from "react";
import {
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
} from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../models/api";
import { ResourceBadge } from "../../PresentationalComponents/ResourceBadge";
import { OrganizationActions } from "../../PresentationalComponents/OrganizationActions/OrganizationActions";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
}

interface DispatchToProps {}

export interface OrganizationPageSectionProps
  extends StateToProps,
    DispatchToProps {
  organizationId: string;
}

export const OrganizationPageSection: React.FC<OrganizationPageSectionProps> = ({
  organization,
}) => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Level>
        <LevelItem>
          {organization?.name && (
            <ResourceBadge
              resourceType="organization"
              resourceId={organization.name}
              isActive={true}
            />
          )}
        </LevelItem>
        <LevelItem>
          <OrganizationActions onEdit={() => {}} onDelete={() => {}} />
        </LevelItem>
      </Level>
    </PageSection>
  );
};

import React from "react";
import {
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
} from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../models/api";
import { ResourceBadge } from "../../PresentationalComponents/Components/ResourceBadge";
import { OrganizationActions } from "../../PresentationalComponents/OrganizationDetailsForm/OrganizationActions/OrganizationActions";
import { AppRouterProps } from "../../models/routerProps";
import { deleteDialogActions } from "../../store/deleteDialog";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
}

interface DispatchToProps {
  deleteOrganization: (organizationId: string) => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

export interface OrganizationPageSectionProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {
  organizationId: string;
}

export const OrganizationPageSection: React.FC<OrganizationPageSectionProps> = ({
  organization,
  showDeleteDialog,
  closeDeleteDialog,
  deleteOrganization,
  history: { push },
}) => {
  const onOrganizationEdit = () => {
    if (organization) {
      push("/organizations/" + organization.id);
    }
  };

  const onOrganizationDelete = () => {
    if (organization) {
      showDeleteDialog({
        name: organization.name,
        type: "organización",
        onDelete: () => {
          deleteOrganization(organization.id).then(() => {
            closeDeleteDialog();
            push("/");
          });
        },
        onCancel: () => {
          closeDeleteDialog();
        },
      });
    }
  };

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
          <OrganizationActions
            onEdit={onOrganizationEdit}
            onDelete={onOrganizationDelete}
          />
        </LevelItem>
      </Level>
    </PageSection>
  );
};

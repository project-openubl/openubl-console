import React from "react";
import {
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
} from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../models/api";
import { ResourceBadge } from "../../../PresentationalComponents/Components/ResourceBadge";
import { OrganizationActions } from "../../../PresentationalComponents/PageOrganizations/Forms/OrganizationActions/OrganizationActions";
import { AppRouterProps } from "../../../models/routerProps";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { AlertModel } from "../../../models/alert";
import { deleteOrganization } from "../../../api/api";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
}

interface DispatchToProps {
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
  addAlert: (alert: AlertModel) => void;
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
  addAlert,
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
            addAlert({
              variant: "success",
              title: "Success",
              description: "Organization deleted successfully",
            });

            push("/");
          });
        },
        onCancel: () => {
          addAlert({
            variant: "danger",
            title: "Error",
            description: "Error while deleting organization",
          });

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

import React, { useState } from "react";
import {
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from "@patternfly/react-core";
import { CaretDownIcon } from "@patternfly/react-icons";
import { ComponentRepresentation } from "../../../models/api";
import { ResourceBadge } from "../../../PresentationalComponents/Components/ResourceBadge";
import { AppRouterProps } from "../../../models/routerProps";
import { deleteDialogActions } from "../../../store/deleteDialog";

interface StateToProps {
  component: ComponentRepresentation | undefined;
}

interface DispatchToProps {
  deleteComponent: (
    organizationId: string,
    componentId: string
  ) => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

export interface KeyPageSectionProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {
  organizationId: string;
}

export const KeyPageSection: React.FC<KeyPageSectionProps> = ({
  organizationId,
  component,
  showDeleteDialog,
  closeDeleteDialog,
  deleteComponent,
  history: { push },
}) => {
  const onDelete = () => {
    if (component) {
      showDeleteDialog({
        name: component.name,
        type: "organización",
        onDelete: () => {
          deleteComponent(organizationId, component.id).then(() => {
            closeDeleteDialog();
            push(`/server/org/${organizationId}/keys`);
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
          {component?.name && (
            <ResourceBadge
              resourceType="component"
              resourceId={component.name}
            />
          )}
        </LevelItem>
        <LevelItem>
          <KeyActions onDelete={onDelete} />
        </LevelItem>
      </Level>
    </PageSection>
  );
};

export interface KeyActionsProps {
  onDelete: () => void;
}

export const KeyActions: React.FC<KeyActionsProps> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => {
        setIsOpen(!isOpen);
      }}
      toggle={
        <DropdownToggle
          onToggle={(isOpen: boolean) => {
            setIsOpen(isOpen);
          }}
          toggleIndicator={CaretDownIcon}
        >
          Actions
        </DropdownToggle>
      }
      dropdownItems={[
        <DropdownItem key="action" component="button" onClick={onDelete}>
          Eliminar
        </DropdownItem>,
      ]}
    />
  );
};

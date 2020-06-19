import * as React from "react";
import {
  TextContent,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from "@patternfly/react-core";
import { CaretDownIcon } from "@patternfly/react-icons";
import { useState } from "react";

export interface OrganizationActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const OrganizationActions: React.FC<OrganizationActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TextContent>
      <Dropdown
        onSelect={() => {
          setIsOpen(false);
        }}
        toggle={
          <DropdownToggle
            onToggle={() => {
              setIsOpen(true);
            }}
            toggleIndicator={CaretDownIcon}
          >
            Actions
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={[
          <DropdownItem key="action" component="button" onClick={onEdit}>
            Editar
          </DropdownItem>,
          <DropdownItem key="action" component="button" onClick={onDelete}>
            Eliminar
          </DropdownItem>,
        ]}
      />
    </TextContent>
  );
};

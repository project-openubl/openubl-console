import React, { useState, useEffect } from "react";
import { ContextSelector, ContextSelectorItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../models/api";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  ctxOrganization: OrganizationRepresentation | undefined;
  ctxOrganizations: OrganizationRepresentation[];
}

interface DispatchToProps {
  selectCtxOrganization: (organization: OrganizationRepresentation) => any;
}

interface Props extends StateToProps, DispatchToProps, AppRouterProps {
  onSelect: (organization: OrganizationRepresentation) => any;
}

interface State {
  isOpen: boolean;
  searchValue: string;
}

export const OrganizationContextSelector: React.FC<Props> = ({
  ctxOrganization,
  ctxOrganizations,
  selectCtxOrganization,
  onSelect,
  match,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const organization = ctxOrganizations.find(
      (p) => p.id === match.params.organizationId
    );
    if (organization) {
      selectCtxOrganization(organization);
    }
  }, [match, ctxOrganizations, selectCtxOrganization]);

  const onToggle = (_: any, value: boolean) => {
    setIsOpen(value);
  };

  const onContextSelect = (_: any, value: any) => {
    const organization = ctxOrganizations.find((p) => p.name === value);
    if (organization) {
      setIsOpen(!isOpen);
      setSearchValue("");
      selectCtxOrganization(organization);
      onSelect(organization);
    }
  };

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const getFilteredOrgs = (
    organizations: OrganizationRepresentation[],
    filterText: string
  ): OrganizationRepresentation[] => {
    return filterText.trim() === ""
      ? organizations || []
      : organizations.filter(
          (org: OrganizationRepresentation) =>
            org.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
        );
  };

  return (
    <ContextSelector
      toggleText={`Organization: ${
        ctxOrganization ? ctxOrganization.name : ""
      }`}
      onSearchInputChange={onSearchInputChange}
      isOpen={isOpen}
      searchInputValue={searchValue}
      onToggle={onToggle}
      onSelect={onContextSelect}
      screenReaderLabel="Selected organization:"
      className="oul-c-context-selector"
    >
      {getFilteredOrgs(ctxOrganizations, searchValue).map(
        (item: OrganizationRepresentation, index: number) => (
          <ContextSelectorItem key={index}>{item.name}</ContextSelectorItem>
        )
      )}
    </ContextSelector>
  );
};

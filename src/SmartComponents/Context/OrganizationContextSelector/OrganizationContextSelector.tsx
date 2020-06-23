import React from "react";
import { ContextSelector, ContextSelectorItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../models/api";

interface StateToProps {
  ctxOrganization: OrganizationRepresentation | undefined;
  ctxOrganizations: OrganizationRepresentation[];
}

interface DispatchToProps {
  selectCtxOrganization: (organization: OrganizationRepresentation) => any;
  fetchOrganizations: () => void;
}

interface Props extends StateToProps, DispatchToProps {
  onSelect: (organization: OrganizationRepresentation) => any;
}

interface State {
  isOpen: boolean;
  searchValue: string;
  filteredItems: OrganizationRepresentation[];
}

export class OrganizationContextSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
      searchValue: "",
      filteredItems: props.ctxOrganizations,
    };
  }

  componentDidMount() {
    this.props.fetchOrganizations();
  }

  componentDidUpdate(_prevProps: Props) {
    if (_prevProps.ctxOrganizations !== this.props.ctxOrganizations) {
      this.setState({ filteredItems: this.props.ctxOrganizations });
    }
  }

  onToggle = (isOpen: any) => {
    this.setState({
      // Workaround until <ContextSelector> props are fixed
      isOpen: !this.state.isOpen,
    });
  };

  onContextSelect = (event: any, value: any) => {
    const { ctxOrganizations, selectCtxOrganization, onSelect } = this.props;

    const organization = ctxOrganizations.find((p) => p.name === value);
    if (organization) {
      this.setState({ isOpen: !this.state.isOpen }, () => {
        selectCtxOrganization(organization);
        onSelect(organization);
      });
    }
  };

  onSearchInputChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  onSearchButtonClick = (event: any) => {
    const filtered: OrganizationRepresentation[] =
      this.state.searchValue.trim() === ""
        ? this.props.ctxOrganizations
        : this.props.ctxOrganizations.filter(
            (org: OrganizationRepresentation) =>
              org.name
                .toLowerCase()
                .indexOf(this.state.searchValue.toLowerCase()) !== -1
          );

    this.setState({ filteredItems: filtered || [] });
  };

  render() {
    const { ctxOrganization } = this.props;
    const { isOpen, searchValue, filteredItems } = this.state;
    return (
      <ContextSelector
        toggleText={ctxOrganization ? ctxOrganization.name : ""}
        onSearchInputChange={this.onSearchInputChange}
        isOpen={isOpen}
        searchInputValue={searchValue}
        onToggle={this.onToggle}
        onSelect={this.onContextSelect}
        onSearchButtonClick={this.onSearchButtonClick}
        screenReaderLabel="Selected organization:"
      >
        {filteredItems.map(
          (item: OrganizationRepresentation, index: number) => (
            <ContextSelectorItem key={index}>{item.name}</ContextSelectorItem>
          )
        )}
      </ContextSelector>
    );
  }
}

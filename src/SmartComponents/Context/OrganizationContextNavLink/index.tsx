import { connect } from "react-redux";
import { OrganizationContextNavLink } from "./OrganizationContextNavLink";
import { createMapStateToProps } from "../../../store/common";
import { organizationContextSelectors } from "../../../store/organizationContext";

const mapStateToProps = createMapStateToProps((state) => ({
  contextOrganization: organizationContextSelectors.selectedOrganization(state),
  contextOrganizations: organizationContextSelectors.organizations(state),
}));

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContextNavLink);

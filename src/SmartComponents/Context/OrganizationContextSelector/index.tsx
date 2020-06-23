import { connect } from "react-redux";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationContextSelectors,
  organizationContextActions,
} from "../../../store/organizationContext";
import { OrganizationContextSelector } from "./OrganizationContextSelector";

const mapStateToProps = createMapStateToProps((state) => ({
  ctxOrganization:
    organizationContextSelectors.selectedOrganization(state) || undefined,
  ctxOrganizations: organizationContextSelectors.organizations(state) || [],
}));

const mapDispatchToProps = {
  selectCtxOrganization: organizationContextActions.selectOrganizationContext,
  fetchOrganizations: organizationContextActions.fetchOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContextSelector);

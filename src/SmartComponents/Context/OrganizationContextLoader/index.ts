import { connect } from "react-redux";
import { OrganizationContextLoader } from "./OrganizationContextLoader";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationContextSelectors,
  organizationContextActions,
} from "../../../store/organizationContext";

const mapStateToProps = createMapStateToProps((state) => ({
  ctxOrganizations: organizationContextSelectors.organizations(state),
  ctxOrganizationsError: organizationContextSelectors.error(state),
  ctxOrganizationsFetchStatus: organizationContextSelectors.status(state),
}));

const mapDispatchToProps = {
  fetchCtxOrganizations: organizationContextActions.fetchOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContextLoader);

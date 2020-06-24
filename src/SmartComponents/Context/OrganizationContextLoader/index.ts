import { connect } from "react-redux";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationContextSelectors,
  organizationContextActions,
} from "../../../store/organizationContext";
import { OrganizationContextLoader } from "./OrganizationContextLoader";

const mapStateToProps = createMapStateToProps((state) => ({
  ctxOrganizations: organizationContextSelectors.organizations(state),
}));

const mapDispatchToProps = {
  fetchOrganizations: organizationContextActions.fetchOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContextLoader);

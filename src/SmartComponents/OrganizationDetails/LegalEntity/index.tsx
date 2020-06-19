import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LegalEntity } from "./LegalEntity";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationActions,
  organizationSelectors,
} from "../../../store/organization";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  organization: organizationSelectors.selectOrganization(
    state,
    ownProps.organizationId
  ),
  organizationError: organizationSelectors.selectOrganizationError(
    state,
    ownProps.organizationId
  ),
  organizationFetchStatus: organizationSelectors.selectOrganizationFetchStatus(
    state,
    ownProps.organizationId
  ),
}));

const mapDispatchToProps = {
  fetchOrganization: organizationActions.fetchOrganization,
  updateOrganization: organizationActions.requestUpdateOrganization,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LegalEntity)
);

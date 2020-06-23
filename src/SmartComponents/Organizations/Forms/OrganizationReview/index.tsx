import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrganizationReview } from "./OrganizationReview";
import { createMapStateToProps } from "../../../../store/common";
import {
  organizationActions,
  organizationSelectors,
} from "../../../../store/organization";

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
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationReview)
);

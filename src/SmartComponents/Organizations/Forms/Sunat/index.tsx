import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Sunat } from "./Sunat";
import { createMapStateToProps } from "../../../../store/common";
import {
  organizationActions,
  organizationSelectors,
} from "../../../../store/organization";
import {
  wsTemplatesSelectors,
  wsTemplatesActions,
} from "../../../../store/wstemplates";
import { alertActions } from "../../../../store/alert";

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
  wsTemplates: wsTemplatesSelectors.wsTemplates(state),
  wsTemplatesError: wsTemplatesSelectors.error(state),
  wsTemplatesFetchStatus: wsTemplatesSelectors.status(state),
}));

const mapDispatchToProps = {
  fetchOrganization: organizationActions.fetchOrganization,
  fetchAllTemplates: wsTemplatesActions.fetchAllWSTemplates,
  addAlert: alertActions.alert,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sunat));

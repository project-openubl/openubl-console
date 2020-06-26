import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreateKey } from "./CreateKey";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationActions,
  organizationSelectors,
} from "../../../store/organization";
import {
  organizationKeysActions,
  organizationKeysSelectors,
} from "../../../store/organizationKeys";
import {
  organizationComponentsActions,
  organizationComponentsSelectors,
} from "../../../store/organizationComponents";
import {
  serverInfoSelectors,
  serverInfoActions,
} from "../../../store/serverInfo";

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
  organizationKeys: organizationKeysSelectors.selectOrganizationKeys(
    state,
    ownProps.organizationId
  ),
  organizationKeysFetchStatus: organizationKeysSelectors.selectOrganizationKeysFetchStatus(
    state,
    ownProps.organizationId
  ),
  organizationKeysError: organizationKeysSelectors.selectOrganizationKeysError(
    state,
    ownProps.organizationId
  ),
  organizationComponents: organizationComponentsSelectors.selectOrganizationComponents(
    state,
    ownProps.organizationId
  ),
  organizationComponentsFetchStatus: organizationComponentsSelectors.selectOrganizationComponentsFetchStatus(
    state,
    ownProps.organizationId
  ),
  organizationComponentsError: organizationComponentsSelectors.selectOrganizationComponentsError(
    state,
    ownProps.organizationId
  ),
  serverInfo: serverInfoSelectors.selectServerInfo(state),
  serverInfoFetchStatus: serverInfoSelectors.selectServerInfoFetchStatus(state),
  serverInfoError: serverInfoSelectors.selectServerInfoError(state),
}));

const mapDispatchToProps = {
  fetchOrganization: organizationActions.fetchOrganization,
  updateOrganization: organizationActions.requestUpdateOrganization,
  fetchOrganizationKeys: organizationKeysActions.fetchOrganizationKeys,
  fetchOrganizationComponents:
    organizationComponentsActions.fetchOrganizationComponents,
  fetchServerInfo: serverInfoActions.fetchServerInfo,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateKey)
);

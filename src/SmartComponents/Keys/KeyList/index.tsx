import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { KeyList } from "./KeyList";
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
import { componentActions } from "../../../store/organizationComponent";
import {
  serverInfoSelectors,
  serverInfoActions,
} from "../../../store/serverInfo";
import { deleteDialogActions } from "../../../store/deleteDialog";

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
  requestDeleteComponent: componentActions.requestDeleteComponent,
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KeyList)
);

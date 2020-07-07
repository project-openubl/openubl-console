import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { KeyList, KeyListOwnProps } from "./KeyList";
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

const mapStateToProps = createMapStateToProps(
  (state, ownProps: KeyListOwnProps) => ({
    organization: organizationSelectors.selectOrganizationData(
      state,
      ownProps.organizationId
    ),
    keys: organizationKeysSelectors.selectKeysData(
      state,
      ownProps.organizationId
    ),
    components: organizationComponentsSelectors.selectComponentsData(
      state,
      ownProps.organizationId
    ),
    serverInfo: serverInfoSelectors.selectServerInfoData(state),
  })
);

const mapDispatchToProps = {
  fetchOrganization: organizationActions.fetchOrganization,
  updateOrganization: organizationActions.requestUpdateOrganization,
  fetchKeys: organizationKeysActions.fetchOrganizationKeys,
  fetchComponents: organizationComponentsActions.fetchOrganizationComponents,
  deleteComponent: componentActions.requestDeleteComponent,
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
  processingDeleteDialog: deleteDialogActions.processing,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KeyList)
);

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrganizationPageSection } from "./OrganizationPageSection";
import { createMapStateToProps } from "../../../store/common";
import { organizationSelectors } from "../../../store/organization";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { alertActions } from "../../../store/alert";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  organization: organizationSelectors.selectOrganization(
    state,
    ownProps.organizationId
  ),
}));

const mapDispatchToProps = {
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
  addAlert: alertActions.alert,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationPageSection)
);

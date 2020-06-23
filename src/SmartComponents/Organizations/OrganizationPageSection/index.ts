import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OrganizationPageSection } from "./OrganizationPageSection";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationSelectors,
  organizationActions,
} from "../../../store/organization";
import { deleteDialogActions } from "../../../store/deleteDialog";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  organization: organizationSelectors.selectOrganization(
    state,
    ownProps.organizationId
  ),
}));

const mapDispatchToProps = {
  deleteOrganization: organizationActions.deleteOrganization,
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationPageSection)
);

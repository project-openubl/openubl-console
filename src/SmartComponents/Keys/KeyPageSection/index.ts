import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { KeyPageSection } from "./KeyPageSection";
import { createMapStateToProps } from "../../../store/common";
import { componentSelectors } from "../../../store/organizationComponent";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { alertActions } from "../../../store/alert";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  component: componentSelectors.selectComponent(state, ownProps.keyId),
}));

const mapDispatchToProps = {
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
  alert: alertActions.alert,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KeyPageSection)
);

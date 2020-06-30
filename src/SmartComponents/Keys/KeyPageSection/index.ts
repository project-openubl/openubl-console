import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { KeyPageSection } from "./KeyPageSection";
import { createMapStateToProps } from "../../../store/common";
import {
  componentSelectors,
  componentActions,
} from "../../../store/organizationComponent";
import { deleteDialogActions } from "../../../store/deleteDialog";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  component: componentSelectors.selectComponent(state, ownProps.keyId),
}));

const mapDispatchToProps = {
  deleteComponent: componentActions.requestDeleteComponent,
  showDeleteDialog: deleteDialogActions.openModal,
  closeDeleteDialog: deleteDialogActions.closeModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KeyPageSection)
);

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreateOrganization } from "./CreateOrganization";
import { createMapStateToProps } from "../../../store/common";
import { alertActions } from "../../../store/alert";
import {
  wsTemplatesSelectors,
  wsTemplatesActions,
} from "../../../store/wstemplates";

const mapStateToProps = createMapStateToProps((state) => ({
  wsTemplates: wsTemplatesSelectors.wsTemplates(state),
  wsTemplatesError: wsTemplatesSelectors.error(state),
  wsTemplatesFetchStatus: wsTemplatesSelectors.status(state),
}));

const mapDispatchToProps = {
  addAlert: alertActions.alert,
  fetchAllTemplates: wsTemplatesActions.fetchAllWSTemplates,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateOrganization)
);

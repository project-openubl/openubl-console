import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreateOrganizationWizard } from "./CreateOrganizationWizard";
import { createMapStateToProps } from "../../store/common";
import { organizationActions } from "../../store/organization";
import { alertActions } from "../../store/alert";
import {
  wsTemplatesSelectors,
  wsTemplatesActions,
} from "../../store/wstemplates";

const mapStateToProps = createMapStateToProps((state) => ({
  wsTemplates: wsTemplatesSelectors.wsTemplates(state),
  wsTemplatesError: wsTemplatesSelectors.error(state),
  wsTemplatesFetchStatus: wsTemplatesSelectors.status(state),
}));

const mapDispatchToProps = {
  createOrganization: organizationActions.requestCreateOrganization,
  addAlert: alertActions.alert,
  fetchAllTemplates: wsTemplatesActions.fetchAllWSTemplates,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateOrganizationWizard)
);

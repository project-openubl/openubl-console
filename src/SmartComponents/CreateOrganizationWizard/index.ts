import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreateOrganizationWizard } from "./CreateOrganizationWizard";
import { createMapStateToProps } from "../../store/common";
import { organizationActions } from "../../store/organization";
import { alertActions } from "../../store/alert";

const mapStateToProps = createMapStateToProps((state) => ({}));

const mapDispatchToProps = {
  createOrganization: organizationActions.requestCreateOrganization,
  addAlert: alertActions.alert,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateOrganizationWizard)
);

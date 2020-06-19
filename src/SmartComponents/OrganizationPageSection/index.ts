import { connect } from "react-redux";
import { OrganizationPageSection } from "./OrganizationPageSection";
import { createMapStateToProps } from "../../store/common";
import { organizationSelectors } from "../../store/organization";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  organization: organizationSelectors.selectOrganization(
    state,
    ownProps.organizationId
  ),
}));

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationPageSection);

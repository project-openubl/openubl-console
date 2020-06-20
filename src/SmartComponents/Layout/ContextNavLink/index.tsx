import { connect } from "react-redux";
import { ContextNavLink } from "./ContextNavLink";
import { createMapStateToProps } from "../../../store/common";
import { organizationContextSelectors } from "../../../store/organizationContext";

const mapStateToProps = createMapStateToProps((state) => ({
  contextOrganization: organizationContextSelectors.selectedOrganization(state),
}));

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContextNavLink);

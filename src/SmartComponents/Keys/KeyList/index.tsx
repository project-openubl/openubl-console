import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { KeyList } from "./KeyList";
import { createMapStateToProps } from "../../../store/common";
import {
  organizationKeysActions,
  organizationKeysSelectors,
} from "../../../store/organizationKeys";
import {
  organizationComponentsActions,
  organizationComponentsSelectors,
} from "../../../store/organizationComponents";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => ({
  organizationKeys: organizationKeysSelectors.selectOrganizationKeys(
    state,
    ownProps.organizationId
  ),
  organizationKeysFetchStatus: organizationKeysSelectors.selectOrganizationKeysFetchStatus(
    state,
    ownProps.organizationId
  ),
  organizationKeysError: organizationKeysSelectors.selectOrganizationKeysError(
    state,
    ownProps.organizationId
  ),
  organizationComponents: organizationComponentsSelectors.selectOrganizationComponents(
    state,
    ownProps.organizationId
  ),
  organizationComponentsFetchStatus: organizationComponentsSelectors.selectOrganizationComponentsFetchStatus(
    state,
    ownProps.organizationId
  ),
  organizationComponentsError: organizationComponentsSelectors.selectOrganizationComponentsError(
    state,
    ownProps.organizationId
  ),
}));

const mapDispatchToProps = {
  fetchOrganizationKeys: organizationKeysActions.fetchOrganizationKeys,
  fetchOrganizationComponents:
    organizationComponentsActions.fetchOrganizationComponents,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KeyList)
);

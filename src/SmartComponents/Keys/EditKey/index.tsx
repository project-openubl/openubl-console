import { connect } from "react-redux";
import { EditKey } from "./EditKey";
import { createMapStateToProps } from "../../../store/common";
import {
  serverInfoSelectors,
  serverInfoActions,
} from "../../../store/serverInfo";
import {
  componentSelectors,
  componentActions,
} from "../../../store/organizationComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = createMapStateToProps((state, ownPros: any) => ({
  serverInfo: serverInfoSelectors.selectServerInfo(state),
  serverInfoFetchStatus: serverInfoSelectors.selectServerInfoFetchStatus(state),
  serverInfoError: serverInfoSelectors.selectServerInfoError(state),
  component: componentSelectors.selectComponent(state, ownPros.keyId),
  componentFetchStatus: componentSelectors.selectComponentFetchStatus(
    state,
    ownPros.keyId
  ),
  componentError: componentSelectors.selectComponentError(state, ownPros.keyId),
}));

const mapDispatchToProps = {
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  fetchComponent: componentActions.fetchComponent,
  updateComponent: componentActions.requestUpdateComponent,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditKey)
);

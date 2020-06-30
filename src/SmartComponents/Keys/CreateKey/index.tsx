import { connect } from "react-redux";
import { CreateKey } from "./CreateKey";
import { createMapStateToProps } from "../../../store/common";
import {
  serverInfoSelectors,
  serverInfoActions,
} from "../../../store/serverInfo";
import { componentActions } from "../../../store/organizationComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = createMapStateToProps((state) => ({
  serverInfo: serverInfoSelectors.selectServerInfo(state),
  serverInfoFetchStatus: serverInfoSelectors.selectServerInfoFetchStatus(state),
  serverInfoError: serverInfoSelectors.selectServerInfoError(state),
}));

const mapDispatchToProps = {
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  requestCreateComponent: componentActions.requestCreateComponent,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateKey)
);

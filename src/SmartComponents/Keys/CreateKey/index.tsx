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
  serverInfo: serverInfoSelectors.selectServerInfoData(state),
}));

const mapDispatchToProps = {
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  createComponent: componentActions.requestCreateComponent,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateKey)
);

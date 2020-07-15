import { connect } from "react-redux";
import { CreateKey } from "./CreateKey";
import { withRouter } from "react-router-dom";
import { createMapStateToProps } from "../../../store/common";
import {
  serverInfoSelectors,
  serverInfoActions,
} from "../../../store/serverInfo";
import { alertActions } from "../../../store/alert";

const mapStateToProps = createMapStateToProps((state) => ({
  serverInfo: serverInfoSelectors.selectServerInfoData(state),
}));

const mapDispatchToProps = {
  fetchServerInfo: serverInfoActions.fetchServerInfo,
  alert: alertActions.alert,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateKey)
);

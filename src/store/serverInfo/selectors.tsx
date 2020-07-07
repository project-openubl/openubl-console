import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";
import { ObjectData } from "../common";
import { ServerInfoRepresentation } from "../../models/api";

export const serverInfoState = (state: RootState) => state[stateKey];

export const selectServerInfo = (state: RootState) =>
  serverInfoState(state).serverInfo;

export const selectServerInfoFetchStatus = (state: RootState) =>
  serverInfoState(state).status;

export const selectServerInfoError = (state: RootState) =>
  serverInfoState(state).error;

export const selectServerInfoData = (
  state: RootState
): ObjectData<ServerInfoRepresentation> => ({
  data: selectServerInfo(state),
  error: selectServerInfoError(state),
  fetchStatus: selectServerInfoFetchStatus(state),
});

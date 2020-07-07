import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAsyncAction } from "typesafe-actions";
import { ServerInfoRepresentation } from "../../models/api";
import { getServerInfo } from "../../api/api";

export const {
  request: fetchServerInfoRequest,
  success: fetchServerInfoSuccess,
  failure: fetchServerInfoFailure,
} = createAsyncAction(
  "serverInfo/fetch/fetch/request",
  "serverInfo/fetch/success",
  "serverInfo/fetch/failure"
)<void, ServerInfoRepresentation, AxiosError>();

export const fetchServerInfo = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchServerInfoRequest());

    return getServerInfo()
      .then((res: AxiosResponse<ServerInfoRepresentation>) => {
        dispatch(fetchServerInfoSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchServerInfoFailure(err));
      });
  };
};

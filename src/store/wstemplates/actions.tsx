import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAsyncAction } from "typesafe-actions";
import {
  WSTemplateRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { getWSTemplates } from "../../api/api";

export const {
  request: fetchAllWSTemplatesRequest,
  success: fetchAllWSTemplatesSuccess,
  failure: fetchAllWSTemplatesFailure,
} = createAsyncAction(
  "wstemplates/fetchAll/request",
  "wstemplates/fetchAll/success",
  "wstemplates/fetchAll/failure"
)<
  void,
  PaginationResponseRepresentation<WSTemplateRepresentation>,
  AxiosError
>();

export const fetchAllWSTemplates = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchAllWSTemplatesRequest());

    return getWSTemplates()
      .then((res: AxiosResponse) => {
        dispatch(fetchAllWSTemplatesSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchAllWSTemplatesFailure(err));
      });
  };
};

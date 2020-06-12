import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAsyncAction } from "typesafe-actions";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { getOrganizations } from "../../api/api";
import { alertFetchEndpoint } from "../alert/actions";

export const {
  request: fetchOrganizationListRequest,
  success: fetchOrganizationListSuccess,
  failure: fetchOrganizationListFailure,
} = createAsyncAction(
  "organizationList/fetch/request",
  "organizationList/fetch/success",
  "organizationList/fetch/failure"
)<
  void,
  PaginationResponseRepresentation<OrganizationRepresentation>,
  AxiosError
>();

export const fetchOrganizations = (
  filterText: string,
  page: number,
  pageSize: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchOrganizationListRequest());

    return getOrganizations(filterText, page, pageSize)
      .then((res: AxiosResponse) => {
        dispatch(fetchOrganizationListSuccess(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchOrganizationListFailure(err));
        alertFetchEndpoint(err)(dispatch);
      });
  };
};

import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAsyncAction, createAction } from "typesafe-actions";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { getOrganizations } from "../../api/api";

export const {
  request: fetchOrganizationsRequest,
  success: fetchOrganizationsSuccess,
  failure: fetchOrganizationsFailure,
} = createAsyncAction(
  "organizationContext/organizations/fetch/request",
  "organizationContext/organizations/fetch/success",
  "organizationContext/organizations/fetch/failure"
)<void, OrganizationRepresentation[], AxiosError>();

export const selectOrganizationContext = createAction(
  "organizationContext/organizations/select"
)<OrganizationRepresentation>();

export const fetchOrganizations = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchOrganizationsRequest());

    return getOrganizations()
      .then(
        (
          res: AxiosResponse<
            PaginationResponseRepresentation<OrganizationRepresentation>
          >
        ) => {
          dispatch(fetchOrganizationsSuccess(res.data.data));
        }
      )
      .catch((err: AxiosError) => {
        dispatch(fetchOrganizationsFailure(err));
      });
  };
};

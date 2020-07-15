import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { OrganizationRepresentation } from "../../models/api";
import { getOrganizationById } from "../../api/api";

interface OrganizationActionMeta {
  organizationId: string;
}

export const fetchOrganizationRequest = createAction(
  "organization/fetch/request"
)<OrganizationActionMeta>();
export const fetchOrganizationSuccess = createAction(
  "organization/fetch/success"
)<OrganizationRepresentation, OrganizationActionMeta>();
export const fetchOrganizationFailure = createAction(
  "organization/fetch/failure"
)<AxiosError, OrganizationActionMeta>();

export const fetchOrganization = (organizationId: string) => {
  return (dispatch: Dispatch) => {
    const meta: OrganizationActionMeta = {
      organizationId,
    };

    dispatch(fetchOrganizationRequest(meta));

    return getOrganizationById(organizationId)
      .then((res: AxiosResponse<OrganizationRepresentation>) => {
        dispatch(fetchOrganizationSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchOrganizationFailure(err, meta));
      });
  };
};

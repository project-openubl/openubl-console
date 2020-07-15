import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { ComponentRepresentation } from "../../models/api";
import { getOrganizationComponent } from "../../api/api";

interface OrganizationComponentActionMeta {
  organizationId: string;
}

interface ComponentItemActionMeta extends OrganizationComponentActionMeta {
  componentId: string;
}

export const fetchComponentRequest = createAction("component/fetch/request")<
  ComponentItemActionMeta
>();
export const fetchComponentSuccess = createAction("component/fetch/success")<
  ComponentRepresentation,
  ComponentItemActionMeta
>();
export const fetchComponentFailure = createAction("component/fetch/failure")<
  AxiosError,
  ComponentItemActionMeta
>();

export const fetchComponent = (organizationId: string, componentId: string) => {
  return (dispatch: Dispatch) => {
    const meta: ComponentItemActionMeta = {
      organizationId: organizationId,
      componentId: componentId,
    };

    dispatch(fetchComponentRequest(meta));

    return getOrganizationComponent(organizationId, componentId)
      .then((res: AxiosResponse<ComponentRepresentation>) => {
        dispatch(fetchComponentSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchComponentFailure(err, meta));
      });
  };
};

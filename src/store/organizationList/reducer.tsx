import { AxiosError } from "axios";
import { ActionType, getType } from "typesafe-actions";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { FetchStatus } from "../common";
import {
  fetchOrganizationListRequest,
  fetchOrganizationListSuccess,
  fetchOrganizationListFailure,
} from "./actions";

export const stateKey = "organizationList";

export type OrganizationListState = Readonly<{
  organizations: PaginationResponseRepresentation<OrganizationRepresentation>;
  error: AxiosError<any> | null;
  status: FetchStatus;
}>;

export const defaultState: OrganizationListState = {
  organizations: {
    data: [],
    meta: { count: 0, offset: 0, limit: 10 },
    links: {
      first: "",
      last: "",
    },
  },
  error: null,
  status: "none",
};

export type OrganizationListAction = ActionType<
  | typeof fetchOrganizationListRequest
  | typeof fetchOrganizationListSuccess
  | typeof fetchOrganizationListFailure
>;

export function organizationListReducer(
  state = defaultState,
  action: OrganizationListAction
): OrganizationListState {
  switch (action.type) {
    case getType(fetchOrganizationListRequest):
      return {
        ...state,
        status: "inProgress",
      };
    case getType(fetchOrganizationListSuccess):
      return {
        ...state,
        status: "complete",
        error: null,
        organizations: action.payload,
      };
    case getType(fetchOrganizationListFailure):
      return {
        ...state,
        status: "complete",
        error: action.payload,
      };
    default:
      return state;
  }
}

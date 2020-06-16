import { AxiosError } from "axios";
import { ActionType, getType } from "typesafe-actions";
import { WSTemplateRepresentation } from "../../models/api";
import { FetchStatus } from "../common";
import {
  fetchAllWSTemplatesRequest,
  fetchAllWSTemplatesSuccess,
  fetchAllWSTemplatesFailure,
} from "./actions";

export const stateKey = "wstemplates";

export type WSTemplatesState = Readonly<{
  templates: WSTemplateRepresentation[] | undefined;
  error: AxiosError | undefined;
  status: FetchStatus;
}>;

export const defaultState: WSTemplatesState = {
  templates: undefined,
  error: undefined,
  status: "none",
};

export type WSTeamplatesAction = ActionType<
  | typeof fetchAllWSTemplatesRequest
  | typeof fetchAllWSTemplatesSuccess
  | typeof fetchAllWSTemplatesFailure
>;

export function wsTeamplatesReducer(
  state = defaultState,
  action: WSTeamplatesAction
): WSTemplatesState {
  switch (action.type) {
    case getType(fetchAllWSTemplatesRequest):
      return {
        ...state,
        status: "inProgress",
      };
    case getType(fetchAllWSTemplatesSuccess):
      return {
        ...state,
        status: "complete",
        error: undefined,
        templates: action.payload.data,
      };
    case getType(fetchAllWSTemplatesFailure):
      return {
        ...state,
        status: "complete",
        error: action.payload,
      };
    default:
      return state;
  }
}

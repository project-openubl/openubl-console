import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const wsTesmplatesState = (state: RootState) => state[stateKey];

export const wsTemplates = (state: RootState) => {
  return wsTesmplatesState(state).templates;
};

export const status = (state: RootState) => wsTesmplatesState(state).status;
export const error = (state: RootState) => wsTesmplatesState(state).error;

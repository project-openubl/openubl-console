import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { deleteDialogStateKey, deleteDialogReducer } from "./deleteDialog";

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [deleteDialogStateKey]: deleteDialogReducer,
});

import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";
import { ObjectData } from "../common";
import { KeysMetadataRepresentation } from "../../models/api";

export const organizationKeysState = (state: RootState) => state[stateKey];

// Fetch migration project

export const selectOrganizationKeys = (
  state: RootState,
  organizationId: string
) => organizationKeysState(state).byOrganizationId.get(organizationId);

export const selectOrganizationKeysFetchStatus = (
  state: RootState,
  organizationId: string
) => organizationKeysState(state).fetchStatus.get(organizationId);

export const selectOrganizationKeysError = (
  state: RootState,
  organizationId: string
) => organizationKeysState(state).errors.get(organizationId);

export const selectKeysData = (
  state: RootState,
  organizationId: string
): ObjectData<KeysMetadataRepresentation> => ({
  data: selectOrganizationKeys(state, organizationId),
  error: selectOrganizationKeysError(state, organizationId),
  fetchStatus: selectOrganizationKeysFetchStatus(state, organizationId),
});

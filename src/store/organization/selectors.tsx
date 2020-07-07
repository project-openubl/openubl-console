import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";
import { ObjectData } from "../common";
import { OrganizationRepresentation } from "../../models/api";

export const organizationState = (state: RootState) => state[stateKey];

// Fetch migration project

export const selectOrganization = (state: RootState, organizationId: string) =>
  organizationState(state).byId.get(organizationId);

export const selectOrganizationFetchStatus = (
  state: RootState,
  organizationId: string
) => organizationState(state).fetchStatus.get(organizationId);

export const selectOrganizationError = (
  state: RootState,
  organizationId: string
) => organizationState(state).errors.get(organizationId);

export const selectOrganizationData = (
  state: RootState,
  organizationId: string
): ObjectData<OrganizationRepresentation> => ({
  data: selectOrganization(state, organizationId),
  error: selectOrganizationError(state, organizationId),
  fetchStatus: selectOrganizationFetchStatus(state, organizationId),
});

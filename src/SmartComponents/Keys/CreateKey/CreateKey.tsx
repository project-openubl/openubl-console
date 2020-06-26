import React from "react";
import { AxiosError } from "axios";
import {
  OrganizationRepresentation,
  KeysMetadataRepresentation,
  ComponentRepresentation,
  ServerInfoRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
  organizationKeys: KeysMetadataRepresentation | undefined;
  organizationKeysFetchStatus: FetchStatus | undefined;
  organizationKeysError: AxiosError | undefined;
  organizationComponents: ComponentRepresentation[] | undefined;
  organizationComponentsFetchStatus: FetchStatus | undefined;
  organizationComponentsError: AxiosError | undefined;
  serverInfo: ServerInfoRepresentation | undefined;
  serverInfoFetchStatus: FetchStatus | undefined;
  serverInfoError: AxiosError | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => void;
  fetchOrganizationKeys: (organizationId: string) => void;
  fetchOrganizationComponents: (organizationId: string) => void;
  fetchServerInfo: () => void;
}

interface KeyListProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
}

export const CreateKey: React.FC<KeyListProps> = () => {
  return <p>Create key form</p>;
};

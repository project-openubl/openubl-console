import ApiClient from "./apiClient";
import { AxiosPromise } from "axios";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
  KeysMetadataRepresentation,
  ComponentRepresentation,
  DocumentType,
} from "../models/openubl";

const ORGANIZATIONS_URL = "/organizations";
const GET_ID_BY_NAME_URL = "/organizations/id-by-name";
const GET_ORGANIZATION_KEYS_URL = "/organizations/{organizationId}/keys";
const ORGANIZATION_COMPONENTS_URL =
  "/organizations/{organizationId}/components";
const GET_ORGANIZATION_COMPONENT_URL =
  "/organizations/{organizationId}/components/{componentId}";
const ORGANIZATION_ENRICH_DOCUMENTS_URL =
  "/organizations/{organizationId}/documents/{documentType}/enrich";
const ORGANIZATION_CREATE_DOCUMENTS_URL =
  "/organizations/{organizationId}/documents/{documentType}/create";

export const getOrganizations = (
  filterText?: string,
  page: number = 1,
  pageSize?: number
): AxiosPromise<
  PaginationResponseRepresentation<OrganizationRepresentation>
> => {
  const params: any = {
    offset: (page - 1) * (pageSize || 0),
    limit: pageSize,
    filterText,
  };
  const query: string[] = [];

  Object.keys(params).forEach((key: string) => {
    const value: any = params[key];
    if (value !== undefined) {
      query.push(`${key}=${value}`);
    }
  });

  return ApiClient.get<
    PaginationResponseRepresentation<OrganizationRepresentation>
  >(`${ORGANIZATIONS_URL}?${query.join("&")}`);
};

export const createOrganization = (
  organization: OrganizationRepresentation
) => {
  return ApiClient.post<OrganizationRepresentation>(
    ORGANIZATIONS_URL,
    organization
  );
};

export const getOrganizationById = (organizationId: string) => {
  return ApiClient.get<OrganizationRepresentation>(
    `${ORGANIZATIONS_URL}/${organizationId}`
  );
};

export const updateOrganization = (
  organizationId: string,
  organization: OrganizationRepresentation
) => {
  return ApiClient.put<OrganizationRepresentation>(
    `${ORGANIZATIONS_URL}/${organizationId}`,
    organization
  );
};

export const removeOrganization = (organizationId: string) => {
  return ApiClient.delete(`${ORGANIZATIONS_URL}/${organizationId}`);
};

export const getOrganizationIdByName = (
  name: string
): AxiosPromise<string | null> => {
  return ApiClient.get(GET_ID_BY_NAME_URL + "/" + encodeURIComponent(name));
};

export const getOrganizationKeys = (
  organizationId: string
): AxiosPromise<KeysMetadataRepresentation> => {
  return ApiClient.get<KeysMetadataRepresentation>(
    GET_ORGANIZATION_KEYS_URL.replace("{organizationId}", organizationId)
  );
};

export const getOrganizationComponents = (
  organizationId: string
): AxiosPromise<ComponentRepresentation[]> => {
  return ApiClient.get<ComponentRepresentation[]>(
    ORGANIZATION_COMPONENTS_URL.replace("{organizationId}", organizationId)
  );
};

export const getOrganizationComponent = (
  organizationId: string,
  componentId: string
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.get<ComponentRepresentation>(
    GET_ORGANIZATION_COMPONENT_URL.replace(
      "{organizationId}",
      organizationId
    ).replace("{componentId}", componentId)
  );
};

export const createOrganizationComponent = (
  organizationId: string,
  component: ComponentRepresentation
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.post<ComponentRepresentation>(
    ORGANIZATION_COMPONENTS_URL.replace("{organizationId}", organizationId),
    component
  );
};

export const updateOrganizationComponent = (
  organizationId: string,
  component: ComponentRepresentation
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.put<ComponentRepresentation>(
    GET_ORGANIZATION_COMPONENT_URL.replace(
      "{organizationId}",
      organizationId
    ).replace("{componentId}", component.id),
    component
  );
};

export const deleteOrganizationComponent = (
  organizationId: string,
  componentId: string
): AxiosPromise => {
  return ApiClient.delete(
    GET_ORGANIZATION_COMPONENT_URL.replace(
      "{organizationId}",
      organizationId
    ).replace("{componentId}", componentId)
  );
};

export const enrichOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    ORGANIZATION_ENRICH_DOCUMENTS_URL.replace(
      "{organizationId}",
      organizationId
    ).replace("{documentType}", documentType),
    document
  );
};

export const createOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    ORGANIZATION_CREATE_DOCUMENTS_URL.replace(
      "{organizationId}",
      organizationId
    ).replace("{documentType}", documentType),
    document
  );
};

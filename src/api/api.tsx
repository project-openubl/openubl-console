import ApiClient from "./apiClient";
import { AxiosPromise } from "axios";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
  KeysMetadataRepresentation,
  ComponentRepresentation,
  DocumentType,
  ServerInfoRepresentation,
} from "../models/api";

const ORGS = "/organizations";
const ORG_KEYS = "/organizations/{organizationId}/keys";
const ORG_COMPONENTS = "/organizations/{organizationId}/components";
const COMPONENT = "/organizations/{organizationId}/components/{componentId}";

const DOCUMENT_ENRICH =
  "/organizations/{organizationId}/documents/{documentType}/enrich";
const DOCUMENT_CREATE =
  "/organizations/{organizationId}/documents/{documentType}/create";

const TEMPLATES = "/templates";

const SERVER_INFO_URL = "/server-info";

export const getOrganizations = (
  name?: string,
  page: number = 1,
  pageSize?: number
): AxiosPromise<
  PaginationResponseRepresentation<OrganizationRepresentation>
> => {
  const params: any = {
    offset: (page - 1) * (pageSize || 0),
    limit: pageSize,
    name,
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
  >(`${ORGS}?${query.join("&")}`);
};

export const getOrganizationByName = (
  name: string
): AxiosPromise<
  PaginationResponseRepresentation<OrganizationRepresentation>
> => {
  return ApiClient.get(ORGS + "?name=" + encodeURIComponent(name));
};

export const createOrganization = (
  organization: OrganizationRepresentation
) => {
  return ApiClient.post<OrganizationRepresentation>(ORGS, organization);
};

export const getOrganizationById = (organizationId: string) => {
  return ApiClient.get<OrganizationRepresentation>(`${ORGS}/${organizationId}`);
};

export const updateOrganization = (
  organizationId: string,
  organization: OrganizationRepresentation
) => {
  return ApiClient.put<OrganizationRepresentation>(
    `${ORGS}/${organizationId}`,
    organization
  );
};

export const removeOrganization = (organizationId: string) => {
  return ApiClient.delete(`${ORGS}/${organizationId}`);
};

export const getOrganizationKeys = (
  organizationId: string
): AxiosPromise<KeysMetadataRepresentation> => {
  return ApiClient.get<KeysMetadataRepresentation>(
    ORG_KEYS.replace("{organizationId}", organizationId)
  );
};

export const getOrganizationComponents = (
  organizationId: string
): AxiosPromise<ComponentRepresentation[]> => {
  return ApiClient.get<ComponentRepresentation[]>(
    ORG_COMPONENTS.replace("{organizationId}", organizationId)
  );
};

export const getOrganizationComponent = (
  organizationId: string,
  componentId: string
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.get<ComponentRepresentation>(
    COMPONENT.replace("{organizationId}", organizationId).replace(
      "{componentId}",
      componentId
    )
  );
};

export const createOrganizationComponent = (
  organizationId: string,
  component: ComponentRepresentation
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.post<ComponentRepresentation>(
    ORG_COMPONENTS.replace("{organizationId}", organizationId),
    component
  );
};

export const updateOrganizationComponent = (
  organizationId: string,
  component: ComponentRepresentation
): AxiosPromise<ComponentRepresentation> => {
  return ApiClient.put<ComponentRepresentation>(
    COMPONENT.replace("{organizationId}", organizationId).replace(
      "{componentId}",
      component.id
    ),
    component
  );
};

export const deleteOrganizationComponent = (
  organizationId: string,
  componentId: string
): AxiosPromise => {
  return ApiClient.delete(
    COMPONENT.replace("{organizationId}", organizationId).replace(
      "{componentId}",
      componentId
    )
  );
};

export const enrichOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    DOCUMENT_ENRICH.replace("{organizationId}", organizationId).replace(
      "{documentType}",
      documentType
    ),
    document
  );
};

export const createOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    DOCUMENT_CREATE.replace("{organizationId}", organizationId).replace(
      "{documentType}",
      documentType
    ),
    document
  );
};

export const getWSTemplates = (
  name?: string
): AxiosPromise<
  PaginationResponseRepresentation<OrganizationRepresentation>
> => {
  const params: any = {
    name,
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
  >(`${TEMPLATES}/ws?${query.join("&")}`);
};

export const getServerInfo = (): AxiosPromise<ServerInfoRepresentation> => {
  return ApiClient.get<ServerInfoRepresentation>(SERVER_INFO_URL);
};

export type DocumentType =
  | "invoice"
  | "credit-note"
  | "debit-note"
  | "voided-document"
  | "summary-document";

export interface PaginationResponseRepresentation<T> {
  meta: Meta;
  links: Links;
  data: T[];
}

export interface Meta {
  count: number;
  limit: number;
  offset: number;
}

export interface Links {
  first: String;
  next?: String;
  previous?: String;
  last: String;
}

export interface OrganizationRepresentation {
  id: string;
  name: string;
  description: string;
  type: string;
  useCustomCertificates: boolean;
  settings: OrganizationSettingsRepresentation;
}

export interface OrganizationSettingsRepresentation {
  ruc: string;
  razonSocial: string;
  nombreComercial?: string;
  sunatUsername: string;
  sunatPassword: string;
  sunatUrlFactura: string;
  sunatUrlGuiaRemision: string;
  sunatUrlPercepcionRetencion: string;
  domicilioFiscal?: AddressRepresentation;
  contacto?: ContactRepresentation;
}

export interface AddressRepresentation {
  ubigeo?: string;
  codigoLocal?: string;
  urbanizacion?: string;
  provincia?: string;
  departamento?: string;
  distrito?: string;
  direccion?: string;
  codigoPais?: string;
}

export interface ContactRepresentation {
  telefono?: string;
  email?: string;
}

export interface KeysMetadataRepresentation {
  active: { [key: string]: string };
  keys: KeyMetadataRepresentation[];
}

export interface KeyMetadataRepresentation {
  providerId: string;
  providerPriority: number;
  kid: string;
  status: string;
  type: string;
  algorithm: string;
  publicKey: string;
  certificate: string;
  // This does not come from backend but from UI
  provider?: ComponentRepresentation;
}

export interface ComponentRepresentation {
  id: string;
  name: string;
  providerId: string;
  providerType: string;
  parentId: string;
  subType: string;
  config: { [key: string]: string[] };
}

export interface ServerInfoRepresentation {
  componentTypes: ComponentTypes;
}

export interface ComponentTypes {
  keyProviders: ComponentTypeRepresentation[];
}

export interface ComponentTypeRepresentation {
  id: string;
  helpText: string;
  properties: ConfigPropertyRepresentation[];
}

export interface ConfigPropertyRepresentation {
  name: string;
  label: string;
  helpText: string;
  type: string;
  defaultValue: string;
  options: string[];
  secret: boolean;
}

export interface WSTemplateRepresentation {
  name: string;
  sunatUrlFactura: string;
  sunatUrlGuiaRemision: string;
  sunatUrlPercepcionRetencion: string;
}

export interface OrganizationFormData {
  name?: string;
  description?: string;
  legalEntityInfo?: LegalEntityFormData;
  legalEntityAddress?: LegalEntityAddressFormData;
  legalEntityContact?: LegalEntityContactFormData;
  webServices?: WebServicesFormData;
}

export interface LegalEntityFormData {
  ruc?: string;
  razonSocial?: string;
  nombreComercial?: string;
}

export interface LegalEntityAddressFormData {
  ubigeo?: string;
  codigoLocal?: string;
  urbanizacion?: string;
  provincia?: string;
  departamento?: string;
  distrito?: string;
  direccion?: string;
  codigoPais?: string;
}

export interface LegalEntityContactFormData {
  email?: string;
  telefono?: string;
}

export interface WebServicesFormData {
  sunatUsername?: string;
  sunatPassword?: string;
  sunatUrlFactura?: string;
  sunatUrlGuiaRemision?: string;
  sunatUrlPercepcionRetencion?: string;
}

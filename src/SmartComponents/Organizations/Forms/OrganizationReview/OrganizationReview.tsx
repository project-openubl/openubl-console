import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { OrganizationRepresentation } from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationFormData } from "../../../../models/ui";
import { OrganizationReviewForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/OrganizationReviewForm/OrganizationReviewForm";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
}

interface OrganizationReviewProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {
  organizationId: string;
}

export const OrganizationReview: React.FC<OrganizationReviewProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
}) => {
  const [formData, setValues] = useState<OrganizationFormData>({});

  useEffect(() => {
    fetchOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (organization) {
      setValues({
        name: organization.name,
        description: organization.description,
        legalEntityInfo: {
          ruc: organization.settings.ruc,
          razonSocial: organization.settings.razonSocial,
          nombreComercial: organization.settings.nombreComercial,
        },
        legalEntityAddress: {
          ubigeo: organization.settings.domicilioFiscal?.ubigeo,
          codigoLocal: organization.settings.domicilioFiscal?.codigoLocal,
          urbanizacion: organization.settings.domicilioFiscal?.urbanizacion,
          departamento: organization.settings.domicilioFiscal?.departamento,
          provincia: organization.settings.domicilioFiscal?.provincia,
          distrito: organization.settings.domicilioFiscal?.distrito,
          direccion: organization.settings.domicilioFiscal?.direccion,
          codigoPais: organization.settings.domicilioFiscal?.codigoPais,
        },
        legalEntityContact: {
          telefono: organization.settings.contacto?.telefono,
          email: organization.settings.contacto?.email,
        },
        webServices: {
          sunatUsername: organization.settings.sunatUsername,
          sunatPassword: organization.settings.sunatPassword,
          sunatUrlFactura: organization.settings.sunatUrlFactura,
          sunatUrlGuiaRemision: organization.settings.sunatUrlGuiaRemision,
          sunatUrlPercepcionRetencion:
            organization.settings.sunatUrlPercepcionRetencion,
        },
      });
    }
  }, [organization]);

  return (
    <React.Fragment>
      {(organizationFetchStatus !== "complete" || organizationError) && (
        <ArticleSkeleton />
      )}
      <OrganizationReviewForm formData={formData} />
    </React.Fragment>
  );
};

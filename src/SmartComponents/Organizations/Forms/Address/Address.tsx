import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationFormData } from "../../../../models/ui";
import { AddressForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/AddressForm";
import { AlertModel } from "../../../../models/alert";
import { updateOrganization } from "../../../../api/api";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  addAlert: (alert: AlertModel) => void;
}

interface AddressProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
  onCancel: () => void;
}

export const Address: React.FC<AddressProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
  addAlert,
  onCancel,
}) => {
  const [formData, setValues] = useState<OrganizationFormData>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    fetchOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (organization) {
      setValues({
        legalEntityAddress: {
          ubigeo: organization.settings.domicilioFiscal?.ubigeo || undefined,
          departamento:
            organization.settings.domicilioFiscal?.departamento || undefined,
          provincia:
            organization.settings.domicilioFiscal?.provincia || undefined,
          distrito:
            organization.settings.domicilioFiscal?.distrito || undefined,
          urbanizacion:
            organization.settings.domicilioFiscal?.urbanizacion || undefined,
          codigoLocal:
            organization.settings.domicilioFiscal?.codigoLocal || undefined,
          direccion:
            organization.settings.domicilioFiscal?.direccion || undefined,
          codigoPais:
            organization.settings.domicilioFiscal?.codigoPais || undefined,
        },
      });
    }
  }, [organization]);

  const handleChange = (data: OrganizationFormData) => {
    setValues({ ...formData, ...data });
  };

  const handleFormChange = (data: OrganizationFormData, isValid: boolean) => {
    handleChange(data);
    setIsFormValid(isValid);
  };

  const onSubmit = async () => {
    if (organization) {
      const data: OrganizationRepresentation = {
        ...organization,
        settings: {
          ...organization.settings,
          domicilioFiscal: {
            ...organization.settings.domicilioFiscal,
            ubigeo: formData.legalEntityAddress?.ubigeo || "",
            departamento: formData.legalEntityAddress?.departamento || "",
            provincia: formData.legalEntityAddress?.provincia || "",
            distrito: formData.legalEntityAddress?.distrito || "",
            urbanizacion: formData.legalEntityAddress?.urbanizacion || "",
            codigoLocal: formData.legalEntityAddress?.codigoLocal || "",
            direccion: formData.legalEntityAddress?.direccion || "",
            codigoPais: formData.legalEntityAddress?.codigoPais || "",
          },
        },
      };

      try {
        await updateOrganization(organizationId, data);
        addAlert({
          variant: "success",
          title: "Success",
          description: "Organization successfully updated",
        });
      } catch (e) {
        addAlert({
          variant: "danger",
          title: "Error",
          description: "Error while updating organization",
        });
      }
    }
  };

  return (
    <React.Fragment>
      {(organizationFetchStatus !== "complete" || organizationError) && (
        <ArticleSkeleton />
      )}
      <Grid lg={8}>
        <GridItem>
          <AddressForm
            formData={formData}
            onHandleChange={handleFormChange}
            showActions
            disableActions={!isFormValid}
            onSave={() => {
              onSubmit();
            }}
            onCancel={onCancel}
          />
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

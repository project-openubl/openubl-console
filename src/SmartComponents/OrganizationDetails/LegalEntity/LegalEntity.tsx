import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { OrganizationRepresentation } from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { AppRouterProps } from "../../../models/routerProps";
import { ArticleSkeleton } from "../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationFormData } from "../../../models/ui";
import { LegalEntityForm } from "../../../PresentationalComponents/Components/OrganizationDetailsForm/LegalEntityForm";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => Promise<void>;
}

interface WebServicesProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {
  organizationId: string;
  onCancel: () => void;
}

export const LegalEntity: React.FC<WebServicesProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
  updateOrganization,
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
        legalEntityInfo: {
          ruc: organization.settings.ruc,
          razonSocial: organization.settings.razonSocial,
          nombreComercial: organization.settings.nombreComercial,
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
          ruc: formData.legalEntityInfo?.ruc || "",
          razonSocial: formData.legalEntityInfo?.razonSocial || "",
          nombreComercial:
            formData.legalEntityInfo?.nombreComercial || undefined,
        },
      };

      await updateOrganization(organizationId, data);
    }
  };

  return (
    <React.Fragment>
      {(organizationFetchStatus !== "complete" || organizationError) && (
        <ArticleSkeleton />
      )}
      <Grid lg={6}>
        <GridItem>
          <LegalEntityForm
            formData={formData}
            onHandleChange={handleFormChange}
            showActions
            disableActions={!isFormValid}
            onSave={onSubmit}
            onCancel={onCancel}
          />
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

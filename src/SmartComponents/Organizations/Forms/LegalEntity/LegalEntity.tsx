import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationFormData } from "../../../../models/ui";
import { LegalEntityForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/LegalEntityForm";
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

      try {
        await updateOrganization(organizationId, data);
        addAlert({
          variant: "success",
          title: "Success",
          description: "Organization updated successfully",
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

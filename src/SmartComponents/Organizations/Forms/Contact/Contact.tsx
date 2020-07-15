import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationFormData } from "../../../../models/ui";
import { ContactForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/ContactForm";
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
        legalEntityContact: {
          email: organization.settings.contacto?.email,
          telefono: organization.settings.contacto?.telefono,
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
          contacto: {
            ...organization.settings.contacto,
            email: formData.legalEntityContact?.email || undefined,
            telefono: formData.legalEntityContact?.telefono || undefined,
          },
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
          <ContactForm
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

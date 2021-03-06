import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Grid, GridItem } from "@patternfly/react-core";
import {
  OrganizationRepresentation,
  WSTemplateRepresentation,
} from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationFormData } from "../../../../models/ui";
import { SunatForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/SunatForm";
import { AlertModel } from "../../../../models/alert";
import { updateOrganization } from "../../../../api/api";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
  wsTemplates: WSTemplateRepresentation[] | undefined;
  wsTemplatesError: AxiosError | undefined;
  wsTemplatesFetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  fetchAllTemplates: () => Promise<void>;
  addAlert: (alert: AlertModel) => void;
}

interface SunatProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
}

export const Sunat: React.FC<SunatProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
  addAlert,
  wsTemplates,
  fetchAllTemplates,
}) => {
  const [formData, setValues] = useState<OrganizationFormData>({});
  const [isWebServicesFormValid, setIsWebServicesFormValid] = useState(false);

  useEffect(() => {
    fetchOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!wsTemplates) {
      fetchAllTemplates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (organization) {
      setValues({
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

  const handleChange = (data: OrganizationFormData) => {
    setValues({ ...formData, ...data });
  };

  const handleWebServicesChange = (
    data: OrganizationFormData,
    isValid: boolean
  ) => {
    handleChange(data);
    setIsWebServicesFormValid(isValid);
  };

  const onSubmit = async () => {
    if (organization) {
      const data: OrganizationRepresentation = {
        ...organization,
        settings: {
          ...organization.settings,
          sunatUsername: formData.webServices?.sunatUsername || "",
          sunatPassword: formData.webServices?.sunatPassword || "",
          sunatUrlFactura: formData.webServices?.sunatUrlFactura || "",
          sunatUrlGuiaRemision:
            formData.webServices?.sunatUrlGuiaRemision || "",
          sunatUrlPercepcionRetencion:
            formData.webServices?.sunatUrlPercepcionRetencion || "",
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
          <SunatForm
            formData={formData}
            onHandleChange={handleWebServicesChange}
            wsTemplates={wsTemplates}
            showActions
            disableActions={!isWebServicesFormValid}
            onSave={() => {
              onSubmit();
            }}
            onCancel={() => {}}
          />
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

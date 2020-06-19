import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  OrganizationRepresentation,
  WSTemplateRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { AppRouterProps } from "../../../models/routerProps";
import { ArticleSkeleton } from "../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationFormData } from "../../../models/ui";
import { SunatForm } from "../../../PresentationalComponents/OrganizationDetailsForm/SunatForm";

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
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => Promise<void>;
  fetchAllTemplates: () => Promise<void>;
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
  updateOrganization,
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

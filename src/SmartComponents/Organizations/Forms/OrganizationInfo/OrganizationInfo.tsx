import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Grid, GridItem } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../../models/api";
import { FetchStatus } from "../../../../store/common";
import { AppRouterProps } from "../../../../models/routerProps";
import { ArticleSkeleton } from "../../../../PresentationalComponents/Components/Skeleton/ArticleSkeleton";
import { OrganizationInfoForm } from "../../../../PresentationalComponents/PageOrganizations/Forms/OrganizationInfoForm";
import { OrganizationFormData } from "../../../../models/ui";
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

interface OrganizationInfoProps
  extends StateToProps,
    DispatchToProps,
    AppRouterProps {
  organizationId: string;
  onCancel: () => void;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = ({
  organizationId,
  organization,
  organizationFetchStatus,
  organizationError,
  fetchOrganization,
  addAlert,
  onCancel,
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
      });
    }
  }, [organization]);

  const handleChange = (data: OrganizationFormData) => {
    setValues({ ...formData, ...data });
  };

  const handleFormChange = (data: OrganizationFormData) => {
    handleChange(data);
  };

  const onSubmit = async () => {
    const data: OrganizationRepresentation = {
      ...organization,
      name: formData.name || "",
      description: formData.description || undefined,
    } as OrganizationRepresentation;

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
  };

  return (
    <React.Fragment>
      {(organizationFetchStatus !== "complete" || organizationError) && (
        <ArticleSkeleton />
      )}
      <Grid lg={6}>
        <GridItem>
          <OrganizationInfoForm
            formData={formData}
            onHandleChange={handleFormChange}
            setIsOrganizationInfoFormValid={() => {}}
            showActions
            onSave={onSubmit}
            onCancel={onCancel}
          />
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

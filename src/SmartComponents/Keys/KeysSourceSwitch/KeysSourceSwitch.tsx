import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Switch } from "@patternfly/react-core";
import { OrganizationRepresentation } from "../../../models/api";
import { FetchStatus } from "../../../store/common";

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

export interface KeysSourceSwitchProps extends StateToProps, DispatchToProps {
  organizationId: string;
  onChange: (checked: boolean) => void;
}

export const KeysSourceSwitch: React.FC<KeysSourceSwitchProps> = ({
  organizationId,
  organization,
  onChange,
  fetchOrganization,
  updateOrganization,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>();

  useEffect(() => {
    fetchOrganization(organizationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  useEffect(() => {
    setIsChecked(organization?.useMasterKeys);
  }, [organization]);

  const handleChange = (checked: boolean) => {
    const data = {
      // ...organization,
      useMasterKeys: checked,
    } as OrganizationRepresentation;

    updateOrganization(organizationId, data);
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <React.Fragment>
      {organization && (
        <Switch
          aria-label="switch"
          label="Usar mis propios certificados"
          labelOff="Usar los certificados de 'master'"
          isChecked={isChecked}
          onChange={handleChange}
        />
      )}
    </React.Fragment>
  );
};

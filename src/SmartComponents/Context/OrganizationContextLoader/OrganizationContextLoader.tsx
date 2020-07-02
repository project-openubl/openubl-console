import React, { useEffect } from "react";
import { AxiosError } from "axios";
import { OrganizationRepresentation } from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { FetchManager } from "../../../PresentationalComponents/Components/FetchManager";

interface StateToProps {
  ctxOrganizations: OrganizationRepresentation[] | undefined;
  ctxOrganizationsError: AxiosError | undefined;
  ctxOrganizationsFetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchCtxOrganizations: () => void;
}

interface OrganizationContextRouteProps extends StateToProps, DispatchToProps {
  children: any;
}

export const OrganizationContextLoader: React.FC<OrganizationContextRouteProps> = ({
  children,
  ctxOrganizationsError,
  ctxOrganizationsFetchStatus,
  fetchCtxOrganizations,
}) => {
  useEffect(() => {
    fetchCtxOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FetchManager
      error={ctxOrganizationsError}
      fetchStatus={ctxOrganizationsFetchStatus}
    >
      {children}
    </FetchManager>
  );
};

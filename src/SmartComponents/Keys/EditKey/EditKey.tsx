import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { GridItem, Grid } from "@patternfly/react-core";
import {
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
  ComponentRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { KeyForm } from "../../../PresentationalComponents/PageOrganizationContext/PageKeys/Forms/KeyForm";
import { AppRouterProps } from "../../../models/routerProps";
import { AlertModel } from "../../../models/alert";

interface StateToProps {
  serverInfo: ServerInfoRepresentation | undefined;
  serverInfoFetchStatus: FetchStatus | undefined;
  serverInfoError: AxiosError | undefined;
  component: ComponentRepresentation | undefined;
  componentFetchStatus: FetchStatus | undefined;
  componentError: AxiosError | undefined;
}

interface DispatchToProps {
  fetchServerInfo: () => void;
  fetchComponent: (organizationId: string, componentId: string) => void;
  alert: (alert: AlertModel) => void;
}

interface EditKeyProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
  keyId: string;
  providerId: string;
}

export const EditKey: React.FC<EditKeyProps> = ({
  organizationId,
  keyId,
  providerId,
  serverInfo,
  component,
  history: { push },
  fetchServerInfo,
  fetchComponent,
  alert,
}) => {
  const [componentType, setComponentType] = useState<
    ComponentTypeRepresentation
  >();

  useEffect(() => {
    fetchServerInfo();
  }, [fetchServerInfo]);

  useEffect(() => {
    if (serverInfo) {
      const keyProviders = serverInfo.componentTypes.keyProviders;
      for (let i = 0; i < keyProviders.length; i++) {
        const provider = keyProviders[i];
        if (provider.id === providerId) {
          setComponentType(provider);
        }
      }
    }
  }, [providerId, serverInfo]);

  useEffect(() => {
    fetchComponent(organizationId, keyId);
  }, [organizationId, keyId, fetchComponent]);

  const onSubmit = async (values: any) => {
    // const { name, ...restValues } = values;
    // const payload: any = {
    //   name,
    //   parentId: organizationId,
    //   providerId: providerId,
    //   providerType: "io.github.project.openubl.keys.KeyProvider",
    //   config: Object.keys(restValues).reduce(
    //     (accumulator: any, currentKey: string) => {
    //       accumulator[currentKey] = [restValues[currentKey].toString()];
    //       return accumulator;
    //     },
    //     {} as any
    //   ),
    // };
    // await requestCreateComponent(organizationId, payload);
    // push(`/server/org/${organizationId}/keys`);
  };

  const onCancel = () => {
    push(`/server/org/${organizationId}/keys`);
  };

  return (
    <Grid hasGutter lg={6}>
      <GridItem>
        {componentType && component && (
          <KeyForm
            componentType={componentType}
            component={component}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        )}
      </GridItem>
    </Grid>
  );
};

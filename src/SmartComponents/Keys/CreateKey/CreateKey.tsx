import React, { useEffect, useState } from "react";
import { Card, CardBody, GridItem, Grid } from "@patternfly/react-core";
import {
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
  ComponentRepresentation,
} from "../../../models/api";
import { ObjectData } from "../../../store/common";
import { KeyForm } from "../../../PresentationalComponents/PageOrganizationContext/PageKeys/Forms/KeyForm";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  serverInfo: ObjectData<ServerInfoRepresentation>;
}

interface DispatchToProps {
  fetchServerInfo: () => void;
  createComponent: (
    organizationId: string,
    component: ComponentRepresentation
  ) => Promise<void>;
}

interface KeyListProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
  providerId: string;
}

export const CreateKey: React.FC<KeyListProps> = ({
  organizationId,
  providerId,
  serverInfo: { data: serverInfoData },
  history: { push },
  fetchServerInfo,
  createComponent,
}) => {
  const [componentType, setComponentType] = useState<
    ComponentTypeRepresentation
  >();

  useEffect(() => {
    fetchServerInfo();
  }, [fetchServerInfo]);

  useEffect(() => {
    if (serverInfoData) {
      const keyProviders = serverInfoData.componentTypes.keyProviders;
      for (let i = 0; i < keyProviders.length; i++) {
        const provider = keyProviders[i];
        if (provider.id === providerId) {
          setComponentType(provider);
        }
      }
    }
  }, [providerId, serverInfoData]);

  const onSubmit = async (values: any) => {
    const { name, ...restValues } = values;
    const payload: any = {
      name,
      parentId: organizationId,
      providerId: providerId,
      providerType: "io.github.project.openubl.keys.KeyProvider",
      config: Object.keys(restValues).reduce(
        (accumulator: any, currentKey: string) => {
          accumulator[currentKey] = [restValues[currentKey].toString()];
          return accumulator;
        },
        {} as any
      ),
    };

    await createComponent(organizationId, payload);
    push(`/server/org/${organizationId}/keys`);
  };

  const onCancel = () => {
    push(`/server/org/${organizationId}/keys`);
  };

  return (
    <Grid hasGutter lg={6}>
      <GridItem>
        <Card>
          <CardBody>
            {componentType && (
              <KeyForm
                componentType={componentType}
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

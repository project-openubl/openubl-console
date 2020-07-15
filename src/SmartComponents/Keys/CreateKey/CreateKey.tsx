import React, { useEffect, useState } from "react";
import { Card, CardBody, GridItem, Grid } from "@patternfly/react-core";
import {
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
} from "../../../models/api";
import { ObjectData } from "../../../store/common";
import { KeyForm } from "../../../PresentationalComponents/PageOrganizationContext/PageKeys/Forms/KeyForm";
import { AppRouterProps } from "../../../models/routerProps";
import { createOrganizationComponent } from "../../../api/api";
import { AlertModel } from "../../../models/alert";

interface StateToProps {
  serverInfo: ObjectData<ServerInfoRepresentation>;
}

interface DispatchToProps {
  fetchServerInfo: () => void;
  alert: (alert: AlertModel) => void;
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
  alert,
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

    try {
      await createOrganizationComponent(organizationId, payload);
      push(`/server/org/${organizationId}/keys`);

      alert({
        variant: "success",
        title: "Success",
        description: "Component created successfully",
      });
    } catch (e) {
      alert({
        variant: "danger",
        title: "Error",
        description: "Error while creating component",
      });
    }
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

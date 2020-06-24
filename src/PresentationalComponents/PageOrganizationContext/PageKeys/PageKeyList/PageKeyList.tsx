import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Card,
  CardBody,
  Stack,
  StackItem,
  CardHeader,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../../models/routerProps";
import KeysSourceSwitch from "../../../../SmartComponents/Keys/KeysSourceSwitch";
import KeyList from "../../../../SmartComponents/Keys/KeyList";

interface PageKeyListProps extends AppRouterProps {}

export const PageKeyList: React.FC<PageKeyListProps> = ({ match }) => {
  const organizationId = match.params.organizationId;

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Certificados</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardBody>
                <KeysSourceSwitch
                  organizationId={organizationId}
                  onChange={(checked: boolean) => {
                    console.log(checked);
                  }}
                />
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardHeader>Certificado en uso</CardHeader>
              <CardBody>Active</CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardBody>
                <KeyList />
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </React.Fragment>
  );
};

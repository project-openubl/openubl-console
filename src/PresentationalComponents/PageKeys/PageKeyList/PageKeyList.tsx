import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Divider,
  Card,
  CardBody,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import { PageAllKeys } from "./PageAllKeys";
import { PageActiveKey } from "./PageActiveKey/PageActiveKey";
import TabsBasedOnRouter from "../../Components/TabsBasedOnRouter";
import RoutersBasedOnMatch from "../../Components/RoutersBasedOnMatch";

interface Props extends AppRouterProps {}

export const PageKeyList: React.FC<Props> = ({ match }) => {
  const organizationId: string = match.params.id;
  const tabs = [
    {
      path: "all",
      title: "Todos",
      render: () => <PageAllKeys organizationId={organizationId} />,
    },
    {
      path: "active",
      title: "Activo",
      render: () => <PageActiveKey organizationId={organizationId} />,
    },
  ];

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Certificados</Text>
        </TextContent>
      </PageSection>
      <PageSection
        variant={PageSectionVariants.light}
        className="oul-c-page__tabs-section"
      >
        <Divider />
        <TabsBasedOnRouter tabs={tabs} />
      </PageSection>
      <PageSection>
        <Card>
          <CardBody>
            <RoutersBasedOnMatch tabs={tabs} />
          </CardBody>
        </Card>
      </PageSection>
    </React.Fragment>
  );
};

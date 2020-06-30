import React from "react";
import { Link } from "react-router-dom";
import {
  PageSection,
  Breadcrumb,
  BreadcrumbItem,
  PageSectionVariants,
  Divider,
  Card,
  CardBody,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../../models/routerProps";
import KeyPageSection from "../../../../SmartComponents/Keys/KeyPageSection";
import TabsBasedOnRouter from "../../../Components/TabsBasedOnRouter";
import RoutersBasedOnMatch from "../../../Components/RoutersBasedOnMatch";
import EditKey from "../../../../SmartComponents/Keys/EditKey";

export interface PageEditKeyProps extends AppRouterProps {}

interface TabInfo {
  path: string;
  title: string;
  children?: TabInfo[];
  render?: () => JSX.Element;
}

export const PageEditKey: React.FC<PageEditKeyProps> = ({
  match: { params },
}) => {
  const tabs: TabInfo[] = [
    {
      path: "overview",
      title: "Overview",
      render: () => (
        <EditKey
          organizationId={params.organizationId}
          keyId={params.keyId}
          providerId={params.providerId}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <section className="pf-m-light pf-c-page__main-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/organizations">Keys</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Details</BreadcrumbItem>
        </Breadcrumb>
      </section>
      <KeyPageSection
        organizationId={params.organizationId}
        keyId={params.keyId}
      />
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

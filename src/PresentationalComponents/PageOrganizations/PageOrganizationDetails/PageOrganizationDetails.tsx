import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import {
  PageSection,
  PageSectionVariants,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  Tab,
  TabTitleText,
  Divider,
  CardBody,
  Card,
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import OrganizationPageSection from "../../../SmartComponents/OrganizationPageSection";
import OrganizationInfo from "../../../SmartComponents/OrganizationDetails/OrganizationInfo";
import OrganizationReview from "../../../SmartComponents/OrganizationReview";
import WebServices from "../../../SmartComponents/OrganizationDetails/Sunat";
import LegalEntity from "../../../SmartComponents/OrganizationDetails/LegalEntity";
import Address from "../../../SmartComponents/OrganizationDetails/Address";
import Contact from "../../../SmartComponents/OrganizationDetails/Contact";

export interface PageOrganizationDetailsProps extends AppRouterProps {}

interface TabInfo {
  path: string;
  title: string;
  children?: TabInfo[];
  render?: () => JSX.Element;
}

export const PageOrganizationDetails: React.FC<PageOrganizationDetailsProps> = ({
  match,
  history: { push },
  location: { pathname },
}) => {
  const organizationId: string = match.params.id;
  const appTabs: TabInfo[] = [
    {
      path: "overview",
      title: "Overview",
      render: () => <OrganizationReview organizationId={organizationId} />,
    },
    {
      path: "general-info",
      title: "Información general",
      render: () => (
        <OrganizationInfo
          organizationId={organizationId}
          onCancel={() => {
            push(getRedirectUrl("overview"));
          }}
        />
      ),
    },
    {
      path: "tu-empresa",
      title: "Tu empresa",
      children: [
        {
          path: "legal-entity",
          title: "Persona jurídica",
          render: () => (
            <LegalEntity
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
        {
          path: "address",
          title: "Dirección",
          render: () => (
            <Address
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
        {
          path: "contact",
          title: "Contacto",
          render: () => (
            <Contact
              organizationId={organizationId}
              onCancel={() => {
                push(getRedirectUrl("overview"));
              }}
            />
          ),
        },
      ],
    },
    {
      path: "sunat",
      title: "SUNAT",
      render: () => <WebServices organizationId={organizationId} />,
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState<string | number>();
  const [secondaryActiveTabKey, setSecondaryActiveTabKey] = useState<
    string | number
  >();

  useEffect(() => {
    let currentPath: string = pathname;
    currentPath = currentPath.replace(`${match.url}`, "");
    if (currentPath[0] === "/") {
      currentPath = currentPath.substring(1);
    }

    const tab = appTabs.find((p) => currentPath.includes(p.path));
    if (tab) {
      setActiveTabKey(tab.path);
    }

    setSecondaryActiveTabKey(currentPath);
  }, [match, pathname, appTabs]);

  const handleTabSelect = (_: any, eventKey: number | string) => {
    push(getRedirectUrl(eventKey));
  };

  const getRedirectUrl = (path: number | string) => {
    return `${match.url}/${path}`;
  };

  return (
    <React.Fragment>
      <section className="pf-m-light pf-c-page__main-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/organizations">Organizations</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Details</BreadcrumbItem>
        </Breadcrumb>
      </section>
      <OrganizationPageSection organizationId={organizationId} />
      <PageSection
        variant={PageSectionVariants.light}
        style={{ paddingTop: 5, paddingBottom: 0 }}
      >
        <Divider />
        <Tabs activeKey={activeTabKey} onSelect={handleTabSelect}>
          {appTabs.map((parent, index) => (
            <Tab
              key={index}
              eventKey={parent.path}
              title={<TabTitleText>{parent.title}</TabTitleText>}
            >
              {parent.children && parent.children.length > 0 && (
                <Tabs
                  isSecondary
                  activeKey={secondaryActiveTabKey}
                  onSelect={handleTabSelect}
                >
                  {parent.children.map((child, i) => (
                    <Tab
                      key={i}
                      eventKey={`${parent.path}/${child.path}`}
                      title={<TabTitleText>{child.title}</TabTitleText>}
                    />
                  ))}
                </Tabs>
              )}
            </Tab>
          ))}
        </Tabs>
      </PageSection>
      <PageSection>
        <Card>
          <CardBody>
            <Switch>
              {appTabs
                .map((parent) => [
                  ...(parent.children || []).map((child) => {
                    const routePath = `${match.path}/${parent.path}/${child.path}`;
                    return (
                      <Route
                        key={routePath}
                        path={routePath}
                        render={child.render}
                      />
                    );
                  }),

                  !parent.children || parent.children.length === 0 ? (
                    <Route
                      key={`${match.path}/${parent.path}`}
                      path={`${match.path}/${parent.path}`}
                      render={parent.render}
                    />
                  ) : (
                    <Redirect
                      key={`${match.path}/${parent.path}`}
                      path={`${match.path}/${parent.path}`}
                      to={`${match.path}/${parent.path}/${parent.children[0].path}`}
                    />
                  ),
                ])
                .reduce((flat, next) => flat.concat(next), [])}

              <Redirect
                from={`${match.path}`}
                to={`${match.path}/${appTabs[0].path}`}
                exact
              />
            </Switch>
          </CardBody>
        </Card>
      </PageSection>
    </React.Fragment>
  );
};

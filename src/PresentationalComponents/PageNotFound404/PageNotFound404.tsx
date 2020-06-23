import * as React from "react";
import {
  PageSection,
  Bullseye,
  EmptyState,
  EmptyStateVariant,
  Title,
  EmptyStateIcon,
  PageSectionVariants,
  TextContent,
  Text,
  EmptyStateBody,
} from "@patternfly/react-core";
import { UnknownIcon } from "@patternfly/react-icons";

export const PageNotFound404: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Error</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.small}>
            <EmptyStateIcon icon={UnknownIcon} />
            <Title headingLevel="h4" size="lg">
              404: Page Not Found
            </Title>
            <EmptyStateBody>
              The resource you are trying to reach does not exists.
            </EmptyStateBody>
          </EmptyState>
          {children}
        </Bullseye>
      </PageSection>
    </React.Fragment>
  );
};

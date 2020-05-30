import * as React from "react";
import {
  PageSection,
  Bullseye,
  EmptyState,
  EmptyStateVariant,
  Title,
  EmptyStateIcon,
} from "@patternfly/react-core";
import { UnknownIcon } from "@patternfly/react-icons";

export const PageNotFound404: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <PageSection>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={UnknownIcon} />
            <Title headingLevel="h5" size="lg">
              Error 403 Not found! The resource you are trying to reach does not
              exists.
            </Title>
          </EmptyState>
          {children}
        </Bullseye>
      </PageSection>
    </React.Fragment>
  );
};

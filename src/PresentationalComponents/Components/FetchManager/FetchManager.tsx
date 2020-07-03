import * as React from "react";
import { AxiosError } from "axios";
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateVariant,
  Bullseye,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";
import { FetchStatus } from "../../../store/common";

export interface FetchManagerProps {
  children: React.ReactElement;
  error: AxiosError | undefined;
  fetchStatus: FetchStatus;
  skeleton?: React.ReactElement;
  errorSkeleton?: React.ReactElement;
}

export const FetchManager: React.FC<FetchManagerProps> = ({
  children,
  skeleton,
  errorSkeleton,
  error,
  fetchStatus,
}) => {
  return (
    <React.Fragment>
      {error && (
        <React.Fragment>
          {errorSkeleton ? (
            errorSkeleton
          ) : (
            <Bullseye>
              <EmptyState variant={EmptyStateVariant.small}>
                <EmptyStateIcon
                  icon={ExclamationCircleIcon}
                  color={globalDangerColor200.value}
                />
                <Title headingLevel="h2" size="lg">
                  Unable to connect
                </Title>
                <EmptyStateBody>
                  There was an error retrieving data. Check your connection and
                  try again.
                </EmptyStateBody>
              </EmptyState>
            </Bullseye>
          )}
        </React.Fragment>
      )}
      {fetchStatus === "inProgress" && skeleton && (
        <React.Fragment>{skeleton}</React.Fragment>
      )}
      {!error && fetchStatus === "complete" && (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

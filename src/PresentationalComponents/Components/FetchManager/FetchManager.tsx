import * as React from "react";
import { AxiosError } from "axios";
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateVariant,
  Bullseye,
  Spinner,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";
import { FetchStatus } from "../../../store/common";

export interface FetchManagerProps {
  children: any;
  error: AxiosError | undefined;
  fetchStatus: FetchStatus;
}

export const FetchManager: React.FC<FetchManagerProps> = ({
  children,
  error,
  fetchStatus,
}) => {
  return (
    <React.Fragment>
      {error && (
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
              There was an error retrieving data. Check your connection and try
              again.
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      )}
      {fetchStatus === "inProgress" && (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )}
      {!error && fetchStatus === "complete" && { children }}
    </React.Fragment>
  );
};

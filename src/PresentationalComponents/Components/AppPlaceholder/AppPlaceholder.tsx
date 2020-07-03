import * as React from "react";
import { Bullseye, Spinner } from "@patternfly/react-core";

export const AppPlaceholder: React.FC = () => {
  return (
    <Bullseye>
      <Spinner />
    </Bullseye>
  );
};

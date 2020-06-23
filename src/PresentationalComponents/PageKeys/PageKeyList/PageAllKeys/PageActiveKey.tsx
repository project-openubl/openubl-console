import React from "react";

export interface PageAllKeysProps {
  organizationId: string;
}

export const PageAllKeys: React.FC<PageAllKeysProps> = () => {
  return (
    <React.Fragment>
      <p>All keys</p>
    </React.Fragment>
  );
};

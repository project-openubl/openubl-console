import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageActiveKey } from "./PageKeyList/PageActiveKey";
import { KeyList } from "./PageKeyList";
import {
  PageSection,
  PageSectionVariants,
  Divider,
} from "@patternfly/react-core";
import OrganizationContextSelector from "../../SmartComponents/Context/OrganizationContextSelector";

export const PageKeys: React.FC = () => {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light} style={{ padding: 0 }}>
        <div className="pf-c-page__main-section">
          <OrganizationContextSelector onSelect={() => {}} />
        </div>
        <Divider />
      </PageSection>
      <Switch>
        <Route path="/keys/org/:id" component={KeyList} />
        <Route path="/keys/org/:id/~new" component={PageActiveKey} exact />
      </Switch>
    </React.Fragment>
  );
};

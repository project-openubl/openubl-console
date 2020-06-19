import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageOrganizationList } from "./PageOrganizationList";
import { PageOrganizationDetails } from "./PageOrganizationDetails";

export const PageOrganizations: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/organizations" component={PageOrganizationList} exact />
        <Route path="/organizations/:id" component={PageOrganizationDetails} />
      </Switch>
    </React.Fragment>
  );
};

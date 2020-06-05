import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.scss";

import { DefaultLayout } from "./components/DefaultLayout";
import { SecuredComponent } from "./components/SecuredComponent";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <SecuredComponent>
          <DefaultLayout>
            <AppRoutes />
          </DefaultLayout>
        </SecuredComponent>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;

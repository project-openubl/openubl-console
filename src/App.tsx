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
        {process.env.REACT_APP_SECURED ? (
          <SecuredComponent>
            <DefaultLayout>
              <AppRoutes />
            </DefaultLayout>
          </SecuredComponent>
        ) : (
          <DefaultLayout>
            <AppRoutes />
          </DefaultLayout>
        )}
      </HashRouter>
    </React.Fragment>
  );
};

export default App;

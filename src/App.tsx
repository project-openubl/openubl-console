import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.scss";

import { DefaultLayout } from "./PresentationalComponents/DefaultLayout";
import { SecuredComponent } from "./PresentationalComponents/SecuredComponent";

const App: React.FC = () => {
  const renderApp = () => (
    <DefaultLayout>
      <AppRoutes />
    </DefaultLayout>
  );

  return (
    <React.Fragment>
      <HashRouter>
        {process.env.REACT_APP_SECURED ? (
          <SecuredComponent>{renderApp()}</SecuredComponent>
        ) : (
          renderApp()
        )}
      </HashRouter>
    </React.Fragment>
  );
};

export default App;

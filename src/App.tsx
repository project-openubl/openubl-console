import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.scss";

import { DefaultLayout } from "./components/DefaultLayout";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <DefaultLayout>
          <AppRoutes />
        </DefaultLayout>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;

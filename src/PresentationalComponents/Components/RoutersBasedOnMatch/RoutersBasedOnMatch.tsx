import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppRouterProps } from "../../../models/routerProps";

export interface RouteTabsSectionProps extends AppRouterProps {
  tabs: TabInfo[];
}

export interface TabInfo {
  path: string;
  children?: TabInfo[];
  render?: () => JSX.Element;
}

export const RouteTabsSection: React.FC<RouteTabsSectionProps> = ({
  match,
  tabs,
}) => {
  return (
    <Switch>
      {tabs
        .map((parent) => [
          ...(parent.children || []).map((child) => {
            const routePath = `${match.path}/${parent.path}/${child.path}`;
            return (
              <Route key={routePath} path={routePath} render={child.render} />
            );
          }),

          !parent.children || parent.children.length === 0 ? (
            <Route
              key={`${match.path}/${parent.path}`}
              path={`${match.path}/${parent.path}`}
              render={parent.render}
            />
          ) : (
            <Redirect
              key={`${match.path}/${parent.path}`}
              path={`${match.path}/${parent.path}`}
              to={`${match.path}/${parent.path}/${parent.children[0].path}`}
            />
          ),
        ])
        .reduce((flat, next) => flat.concat(next), [])}

      <Redirect
        from={`${match.path}`}
        to={`${match.path}/${tabs[0].path}`}
        exact
      />
    </Switch>
  );
};

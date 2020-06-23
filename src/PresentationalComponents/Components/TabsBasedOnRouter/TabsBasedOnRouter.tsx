import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabTitleText } from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";

export interface TabsBasedOnRouterProps extends AppRouterProps {
  tabs: TabInfo[];
}

export interface TabInfo {
  path: string;
  title: string;
  children?: TabInfo[];
}

export const TabsBasedOnRouter: React.FC<TabsBasedOnRouterProps> = ({
  match,
  history: { push },
  location: { pathname },
  tabs,
}) => {
  const [activeKey, setActiveKey] = useState<string | number>();
  const [secondaryActiveKey, setSecondaryActiveKey] = useState<
    string | number
  >();

  useEffect(() => {
    let currentPath: string = pathname;
    currentPath = currentPath.replace(`${match.url}`, "");
    if (currentPath[0] === "/") {
      currentPath = currentPath.substring(1);
    }

    const tab = tabs.find((p) => currentPath.includes(p.path));
    if (tab) {
      setActiveKey(tab.path);
    }

    setSecondaryActiveKey(currentPath);
  }, [match, pathname, tabs]);

  const handleSelect = (_: any, eventKey: number | string) => {
    push(`${match.url}/${eventKey}`);
  };

  return (
    <Tabs activeKey={activeKey} onSelect={handleSelect}>
      {tabs.map((parent, index) => (
        <Tab
          key={index}
          eventKey={parent.path}
          title={<TabTitleText>{parent.title}</TabTitleText>}
        >
          {parent.children && parent.children.length > 0 && (
            <Tabs
              isSecondary
              activeKey={secondaryActiveKey}
              onSelect={handleSelect}
            >
              {parent.children.map((child, i) => (
                <Tab
                  key={i}
                  eventKey={`${parent.path}/${child.path}`}
                  title={<TabTitleText>{child.title}</TabTitleText>}
                />
              ))}
            </Tabs>
          )}
        </Tab>
      ))}
    </Tabs>
  );
};

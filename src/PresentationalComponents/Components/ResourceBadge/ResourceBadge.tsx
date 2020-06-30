import * as React from "react";
import { TextContent, Text, Tooltip, Label } from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";

interface Resource {
  abbr: string;
  name: string;
}

const resources: Map<string, Resource> = new Map([
  [
    "organization",
    {
      abbr: "ORG",
      name: "Organization",
    },
  ],
  [
    "component",
    {
      abbr: "CO",
      name: "Component",
    },
  ],
]);

export interface ResourceBadgeProps {
  resourceId: string;
  resourceType: "organization" | "component";
  isActive?: boolean;
}

export const ResourceBadge: React.FC<ResourceBadgeProps> = ({
  resourceId,
  resourceType,
  isActive,
}) => {
  return (
    <TextContent>
      <Text component="h1">
        <Tooltip content={<div>{resources.get(resourceType)?.name}</div>}>
          <Label color="grey">{resources.get(resourceType)?.abbr}</Label>
        </Tooltip>
        <span>&nbsp;{resourceId}&nbsp;</span>
        {isActive && (
          <Label color={isActive ? "green" : "red"} icon={<CheckCircleIcon />}>
            {isActive ? "Active" : "Inactive"}
          </Label>
        )}
      </Text>
    </TextContent>
  );
};

import * as React from "react";
import { Table, TableHeader, TableBody, ICell } from "@patternfly/react-table";
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateVariant,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";

export interface TableErrorProps {
  columns: (ICell | string)[];
}

export const TableError: React.FC<TableErrorProps> = ({ columns }) => {
  const rows = [
    {
      heightAuto: true,
      cells: [
        {
          props: { colSpan: 8 },
          title: (
            <EmptyState variant={EmptyStateVariant.small}>
              <EmptyStateIcon
                icon={ExclamationCircleIcon}
                color={globalDangerColor200.value}
              />
              <Title headingLevel="h2" size="lg">
                Unable to connect
              </Title>
              <EmptyStateBody>
                There was an error retrieving data. Check your connection and
                try again.
              </EmptyStateBody>
            </EmptyState>
          ),
        },
      ],
    },
  ];

  return (
    <Table cells={columns} rows={rows} aria-label="Error table">
      <TableHeader />
      <TableBody />
    </Table>
  );
};

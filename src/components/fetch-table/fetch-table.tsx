import * as React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
  EmptyStateBody,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  IActions,
} from "@patternfly/react-table";
import Skeleton from "@material-ui/lab/Skeleton";
import { FetchStatus } from "../../store/common";
import { Constants } from "../../Constants";

interface Props {
  columns: ICell[];
  rows: IRow[];
  actions: IActions;
  fetchStatus: FetchStatus;
  fetchError?: any;
}

export const FetchTable: React.FC<Props> = ({
  columns,
  rows,
  actions,
  fetchStatus,
  fetchError,
}) => {
  let rowsValue: IRow[] = rows;

  if (fetchStatus !== "complete") {
    rowsValue = [...Array(Constants.DEFAULT_PAGE_SIZE)].map(() => {
      return {
        cells: [...Array(columns.length)].map(() => ({
          title: <Skeleton />,
        })),
      };
    });
  }

  if (fetchError) {
    rowsValue = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: columns.length },
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
  }

  return (
    <Table
      aria-label="Table"
      cells={columns}
      rows={rowsValue}
      actions={rowsValue === rows ? actions : undefined}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

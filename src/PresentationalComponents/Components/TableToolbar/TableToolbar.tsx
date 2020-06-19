import * as React from "react";
import {
  ToolbarGroup,
  ToolbarItem,
  TextInput,
  Pagination,
  Bullseye,
  Spinner,
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
  EmptyStateBody,
  Button,
} from "@patternfly/react-core";
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  IActions,
} from "@patternfly/react-table";
import { SearchIcon, ExclamationCircleIcon } from "@patternfly/react-icons";
import { global_danger_color_200 as globalDangerColor200 } from "@patternfly/react-tokens";

import { FetchStatus } from "../../../store/common";
import { AxiosError } from "axios";

export interface TableToolbarProps {
  error: AxiosError;
  fetchStatus: FetchStatus;
  columns: (ICell | string)[];
  actions?: IActions;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  error,
  fetchStatus,
  columns,
  actions,
}) => {
  let rows: (IRow | string[])[] = [];

  const loadingRows = [
    {
      heightAuto: true,
      cells: [
        {
          props: { colSpan: 8 },
          title: (
            <Bullseye>
              <Spinner size="xl" />
            </Bullseye>
          ),
        },
      ],
    },
  ];

  const errorRows = [
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

  const emptyState = () => (
    <EmptyState variant={EmptyStateVariant.small}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        No results found
      </Title>
      <EmptyStateBody>
        No results match the filter criteria. Remove all filters or clear all
        filters to show results.
      </EmptyStateBody>
      <Button variant="link">Clear all filters</Button>
    </EmptyState>
  );

  if (fetchStatus !== "complete") {
    rows = loadingRows;
  }
  if (error) {
    rows = errorRows;
  }

  React.useEffect(() => {});

  return (
    <React.Fragment>
      <Table
        aria-label="List Table"
        cells={columns}
        rows={rows}
        actions={actions}
      >
        <TableHeader />
        <TableBody />
        {rows.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={10}>
                {/* <Pagination
                  itemCount={organizations.totalSize}
                  page={page}
                  perPage={pageSize}
                  onPageInput={this.handleOnPageInput}
                  onSetPage={this.handleOnSetPage}
                  widgetId="pagination-options-menu-top"
                  onPerPageSelect={this.handleOnPerPageSelect}
                  isCompact={isCompact}
                /> */}
              </td>
            </tr>
          </tfoot>
        )}
      </Table>
      {rows.length === 0 && emptyState()}
    </React.Fragment>
  );
};

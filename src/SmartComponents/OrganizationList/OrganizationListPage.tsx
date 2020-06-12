import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import {
  Button,
  Toolbar,
  ToolbarItem,
  Pagination,
  ToolbarContent,
} from "@patternfly/react-core";
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  cellWidth,
  IAction,
} from "@patternfly/react-table";
import {
  OrganizationRepresentation,
  PaginationResponseRepresentation,
} from "../../models/api";
import { FetchStatus } from "../../store/common";
import { deleteDialogActions } from "../../store/deleteDialog";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { TableError } from "../../PresentationalComponents/TableError";
import { FilterToolbarItem } from "../../PresentationalComponents/FilterToolbarItem";

interface StateToProps {
  organizations: PaginationResponseRepresentation<OrganizationRepresentation>;
  error: AxiosError<any> | null;
  fetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchOrganizations: (
    filterText: string,
    page: number,
    pageSize: number
  ) => Promise<void>;
  deleteOrganization: (organizationId: string) => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {}

interface State {
  filterText: string;
  page: number;
  pageSize: number;
  rows: IRow[];
  columns: ICell[];
  actions: IAction[];
}

export class OrganizationList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: "",
      page: 1,
      pageSize: 10,
      rows: [],
      columns: [
        { title: "Nombre", transforms: [cellWidth(30)] },
        { title: "Descripcion", transforms: [] },
        { title: "Tipo", transforms: [cellWidth(10)] },
      ],
      actions: [
        {
          title: "Editar",
          onClick: this.handleEditar,
        },
        {
          title: "Eliminar",
          onClick: this.handleEliminar,
        },
      ],
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = async (
    page: number = this.state.page,
    pageSize: number = this.state.pageSize,
    filterText: string = this.state.filterText
  ) => {
    const { fetchOrganizations } = this.props;

    await fetchOrganizations(filterText, page, pageSize);
    this.filtersInRowsAndCells();
  };

  filtersInRowsAndCells = (
    data: PaginationResponseRepresentation<OrganizationRepresentation> = this
      .props.organizations
  ) => {
    const rows: (IRow | string[])[] = data.data.map(
      (item: OrganizationRepresentation) => {
        return {
          cells: [
            {
              title: (
                <Link to={`/organizations/manage/${item.id}/keys`}>
                  {item.name}
                </Link>
              ),
            },
            {
              title: item.description ? (
                <span>{item.description}</span>
              ) : (
                <small>No description</small>
              ),
            },
            {
              title: item.type,
            },
          ],
        };
      }
    );

    this.setState({ rows });
  };

  // handlers

  handleEditar = (event: React.MouseEvent, rowIndex: number): void => {
    const { history, organizations } = this.props;
    history.push(
      "/organizations/manage/" + organizations.data[rowIndex].id + "/edit"
    );
  };

  handleEliminar = (event: React.MouseEvent, rowIndex: number) => {
    const {
      showDeleteDialog,
      closeDeleteDialog,
      deleteOrganization,
    } = this.props;

    const { organizations } = this.props;
    const organization = organizations.data[rowIndex];

    showDeleteDialog({
      name: organization.name,
      type: "organización",
      onDelete: () => {
        deleteOrganization(organization.id).then(() => {
          closeDeleteDialog();
        });
      },
      onCancel: () => {
        closeDeleteDialog();
      },
    });
  };

  handleSearchSubmit = (values: any) => {
    const page = 1;
    const { pageSize } = this.state;
    const filterText: string = values.filterText.trim();

    this.setState({ filterText }, () => {
      this.refreshData(page, pageSize, filterText);
    });
  };

  onPageChange = (event: any, page: number) => {
    this.setState({ page }, () => {
      this.refreshData(page);
    });
  };

  handleOnSetPage = (event: any, page: number) => {
    return this.onPageChange(event, page);
  };

  handleOnPageInput = (event: any, page: number) => {
    return this.onPageChange(event, page);
  };

  handleOnPerPageSelect = (_event: any, pageSize: number) => {
    let page = this.state.page;
    const total = this.props.organizations.meta.count;

    // If current page and perPage would request data beyond total, show last available page
    if (page * pageSize > total) {
      page = Math.floor(total / pageSize) + 1;
    }

    this.setState({ page, pageSize }, () => {
      this.refreshData(page, pageSize);
    });
  };

  // render

  renderPagination = (isCompact: boolean) => {
    const { page, pageSize } = this.state;
    const { organizations } = this.props;
    return (
      <Pagination
        itemCount={organizations.meta.count}
        page={page}
        perPage={pageSize}
        onPageInput={this.handleOnPageInput}
        onSetPage={this.handleOnSetPage}
        widgetId="pagination-options-menu-top"
        onPerPageSelect={this.handleOnPerPageSelect}
        isCompact={isCompact}
      />
    );
  };

  renderTable = () => {
    const { error, fetchStatus } = this.props;
    const { columns, rows, actions } = this.state;

    if (fetchStatus !== "complete") {
      // return <TableSkeleton columns={columns} rowSize={pageSize} />;
      return <p>Skeleton</p>;
    }

    if (error) {
      return <TableError columns={columns} />;
    }

    if (rows.length === 0) {
      return <p>Table empty</p>;
    }

    return (
      <React.Fragment>
        <Table
          aria-label="Organization List Table"
          cells={columns}
          rows={rows}
          actions={actions}
        >
          <TableHeader />
          <TableBody />
          {rows.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={10}>{this.renderPagination(false)}</td>
              </tr>
            </tfoot>
          )}
        </Table>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar id="toolbar">
          <ToolbarContent>
            <FilterToolbarItem
              onFilterChange={() => console.log("3")}
              placeholder="Filter by name"
            />
            <ToolbarItem>
              <Link to="/organizations/create">
                <Button aria-label="Crear organización">
                  Crear organización
                </Button>
              </Link>
            </ToolbarItem>
            <ToolbarItem
              variant="pagination"
              alignment={{ default: "alignRight" }}
            >
              {this.renderPagination(true)}
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        {this.renderTable()}
      </React.Fragment>
    );
  }
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import {
  Stack,
  StackItem,
  Card,
  CardBody,
  CardHeader,
  Switch,
  ClipboardCopy,
  Level,
  LevelItem,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  GridItem,
  Grid,
} from "@patternfly/react-core";
import {
  Table,
  IRow,
  TableHeader,
  TableBody,
  ICell,
  expandable,
  IActions,
} from "@patternfly/react-table";
import { StarIcon, BoxOpenIcon, CaretDownIcon } from "@patternfly/react-icons";
import { global_palette_gold_200 as globalPaletteGold200 } from "@patternfly/react-tokens";
import {
  OrganizationRepresentation,
  KeysMetadataRepresentation,
  ComponentRepresentation,
  KeyMetadataRepresentation,
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
} from "../../../models/api";
import { FetchStatus } from "../../../store/common";
import { getMapKeys, getMapValues } from "../../../utils/utils";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  organization: OrganizationRepresentation | undefined;
  organizationError: AxiosError | undefined;
  organizationFetchStatus: FetchStatus | undefined;
  organizationKeys: KeysMetadataRepresentation | undefined;
  organizationKeysFetchStatus: FetchStatus | undefined;
  organizationKeysError: AxiosError | undefined;
  organizationComponents: ComponentRepresentation[] | undefined;
  organizationComponentsFetchStatus: FetchStatus | undefined;
  organizationComponentsError: AxiosError | undefined;
  serverInfo: ServerInfoRepresentation | undefined;
  serverInfoFetchStatus: FetchStatus | undefined;
  serverInfoError: AxiosError | undefined;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => void;
  fetchOrganizationKeys: (organizationId: string) => void;
  fetchOrganizationComponents: (organizationId: string) => void;
  requestDeleteComponent: (
    organizationId: string,
    componentId: string
  ) => Promise<void>;
  fetchServerInfo: () => void;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

interface KeyListProps extends StateToProps, DispatchToProps, AppRouterProps {
  organizationId: string;
}

export const KeyList: React.FC<KeyListProps> = ({
  organizationId,
  organization,
  organizationKeys,
  organizationComponents,
  serverInfo,
  fetchOrganization,
  updateOrganization,
  fetchOrganizationKeys,
  fetchOrganizationComponents,
  requestDeleteComponent,
  fetchServerInfo,
  showDeleteDialog,
  closeDeleteDialog,
  history,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>();

  // [providerId, Component]
  const [componentsMap, setComponentsMap] = useState<
    Map<string, ComponentRepresentation>
  >();

  // [providerId, Key]
  const [keysMap, setKeysMap] = useState<
    Map<string, KeyMetadataRepresentation>
  >();

  // [Type,providerId] E.g. [{RS256: 'id'}]
  const [activeKeys, setActiveKeys] = useState<Map<string, string>>();

  useEffect(() => {
    fetchOrganization(organizationId);
    fetchOrganizationKeys(organizationId);
    fetchOrganizationComponents(organizationId);
  }, [
    organizationId,
    fetchOrganization,
    fetchOrganizationKeys,
    fetchOrganizationComponents,
  ]);

  useEffect(() => {
    fetchServerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsSwitchChecked(organization?.useCustomCertificates);
  }, [organization]);

  useEffect(() => {
    if (organizationComponents) {
      const components: Map<string, ComponentRepresentation> = new Map();
      organizationComponents.forEach((e) => {
        components.set(e.id, e);
      });
      setComponentsMap(components);
    }
  }, [organizationComponents]);

  useEffect(() => {
    if (organizationKeys) {
      const keys: Map<string, KeyMetadataRepresentation> = new Map();
      organizationKeys.keys.forEach((e) => {
        keys.set(e.providerId, e);
      });
      setKeysMap(keys);

      const activeKeys: Map<string, string> = new Map();
      for (const k in organizationKeys.active) {
        if (organizationKeys.active[k]) {
          const kid = organizationKeys.active[k];
          const key = organizationKeys.keys.find((e) => e.kid === kid);
          activeKeys.set(k, key!.providerId);
        }
      }
      setActiveKeys(activeKeys);
    }
  }, [organizationKeys]);

  const handleSwitchChange = (checked: boolean) => {
    const data = {
      useCustomCertificates: checked,
    } as OrganizationRepresentation;

    updateOrganization(organizationId, data);
    setIsSwitchChecked(checked);
  };

  const handleComponentDelete = (component: ComponentRepresentation) => {
    showDeleteDialog({
      name: component.name,
      type: "component",
      onDelete: () => {
        requestDeleteComponent(organizationId, component.id).then(() => {
          closeDeleteDialog();

          fetchOrganizationKeys(organizationId);
          fetchOrganizationComponents(organizationId);
        });
      },
      onCancel: () => {
        closeDeleteDialog();
      },
    });
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardBody>
            <Level hasGutter>
              <LevelItem>
                {organization && (
                  <Switch
                    aria-label="switch"
                    label="Usar mis propios certificados"
                    labelOff="Usar los certificados de 'master'"
                    isChecked={isSwitchChecked}
                    onChange={handleSwitchChange}
                  />
                )}
              </LevelItem>
              <LevelItem>
                {serverInfo && (
                  <KeyDropdown
                    organizationId={organizationId}
                    keyProviders={serverInfo.componentTypes.keyProviders}
                    isDisabled={!isSwitchChecked}
                  />
                )}
              </LevelItem>
            </Level>
          </CardBody>
        </Card>
      </StackItem>

      {isSwitchChecked &&
        activeKeys &&
        componentsMap &&
        keysMap &&
        componentsMap.size === keysMap.size &&
        getMapKeys(componentsMap).every((providerId: string) =>
          keysMap.get(providerId)
        ) && (
          <React.Fragment>
            <StackItem>
              <Grid hasGutter>
                <GridItem sm={12} md={4}>
                  <Card>
                    <CardHeader>
                      <span>
                        <i>
                          <StarIcon color={globalPaletteGold200.value} />
                        </i>
                        &nbsp;Certificado en uso
                      </span>
                    </CardHeader>
                    <CardBody>
                      {getMapValues(activeKeys).map(
                        (providerId: string, index: number) => {
                          const component = componentsMap.get(providerId)!;
                          const key = keysMap.get(providerId)!;
                          return (
                            <div key={index} className="pf-c-content">
                              <dl>
                                <dt>Proveedor</dt>
                                <dd>
                                  <Link
                                    to={`/server/org/${organizationId}/keys/${component.id}/${component.providerId}`}
                                  >
                                    {component.name}
                                  </Link>
                                </dd>
                                <dt>Tipo</dt>
                                <dd>{key.type}</dd>
                                <dt>Prioridad</dt>
                                <dd>{key.providerPriority}</dd>
                                <dt>Llave pública</dt>
                                <dd>
                                  <ClipboardCopy>{key.publicKey}</ClipboardCopy>
                                </dd>
                                <dt>Certificado</dt>
                                <dd>
                                  <ClipboardCopy>
                                    {key.certificate}
                                  </ClipboardCopy>
                                </dd>
                              </dl>
                            </div>
                          );
                        }
                      )}
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem sm={12} md={8}>
                  <Card>
                    <CardHeader>Todos los certificados</CardHeader>
                    <CardBody>
                      {getMapKeys(componentsMap).every((providerId: string) =>
                        keysMap.get(providerId)
                      ) && (
                        <KeyTable
                          history={history}
                          organizationId={organizationId}
                          components={getMapValues(componentsMap)}
                          keys={getMapValues(keysMap)}
                          onDelete={handleComponentDelete}
                        />
                      )}
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </StackItem>
          </React.Fragment>
        )}
      {!isSwitchChecked && (
        <StackItem>
          <Card>
            <CardBody>
              <EmptyState variant={EmptyStateVariant.small}>
                <EmptyStateIcon icon={BoxOpenIcon} />
                <Title headingLevel="h4" size="lg">
                  No hay certificados que mostrar
                </Title>
                <EmptyStateBody>
                  Todos los documentos creados en la presente organización serán
                  firmados usando los certificados digitales de la organización{" "}
                  <code>master</code>.
                </EmptyStateBody>
              </EmptyState>
            </CardBody>
          </Card>
        </StackItem>
      )}
    </Stack>
  );
};

interface keyDropDownProps {
  organizationId: string;
  keyProviders: ComponentTypeRepresentation[];
  isDisabled: boolean;
}

export const KeyDropdown: React.FC<keyDropDownProps> = ({
  keyProviders,
  isDisabled,
  organizationId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();

  return (
    <Dropdown
      onSelect={() => {
        setIsDropdownOpen(!isDropdownOpen);
      }}
      toggle={
        <DropdownToggle
          onToggle={(isOpen: boolean) => {
            setIsDropdownOpen(isOpen);
          }}
          toggleIndicator={CaretDownIcon}
          isPrimary={!isDisabled}
          isDisabled={isDisabled}
        >
          Crear certificado
        </DropdownToggle>
      }
      isOpen={isDropdownOpen}
      dropdownItems={keyProviders
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((provider: ComponentTypeRepresentation) => (
          <DropdownItem
            key={provider.id}
            component={
              <Link
                to={`/server/org/${organizationId}/keys/~new/${provider.id}`}
              >
                {provider.id}
              </Link>
            }
          ></DropdownItem>
        ))}
    />
  );
};

interface KeyTableProps {
  organizationId: string;
  components: ComponentRepresentation[];
  keys: KeyMetadataRepresentation[];
  history: any;
  onDelete: (component: ComponentRepresentation) => void;
}

export const KeyTable: React.FC<KeyTableProps> = ({
  organizationId,
  components,
  keys,
  history,
  onDelete,
}) => {
  const columns: (ICell | string)[] = [
    { title: "Proveedor", transforms: [], cellFormatters: [expandable] },
    { title: "Tipo", transforms: [] },
    { title: "Prioridad", transforms: [] },
  ];

  const [rows, setRows] = useState<IRow[]>([]);

  const actions: IActions = [
    {
      title: "Edit",
      onClick: (_, rowId) =>
        history.push(
          `/server/org/${organizationId}/keys/${components[rowId].id}/${components[rowId].providerId}`
        ),
    },
    {
      title: "Delete",
      onClick: (_, rowId) => {
        console.log(components);
        console.log(rowId);
        onDelete(components[rowId / 2]);
      },
    },
  ];

  useEffect(() => {
    if (components && keys && components.length === keys.length) {
      const rows: (IRow | string[])[] = [];
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const key = keys[i];

        rows.push(
          {
            isOpen: false,
            cells: [
              {
                title: (
                  <Link
                    to={`/server/org/${organizationId}/keys/${component.id}/${component.providerId}`}
                  >
                    {component.name}
                  </Link>
                ),
              },
              {
                title: key.type,
              },
              {
                title: key.providerPriority,
              },
            ],
          },
          {
            parent: i * 2,
            fullWidth: false,
            cells: [
              {
                title: (
                  <React.Fragment>
                    <div className="pf-c-content">
                      <dl>
                        <dt>Llave pública</dt>
                        <dd>
                          <ClipboardCopy>{key.publicKey}</ClipboardCopy>
                        </dd>
                        <dt>Certificado</dt>
                        <dd>
                          <ClipboardCopy>{key.certificate}</ClipboardCopy>
                        </dd>
                      </dl>
                    </div>
                  </React.Fragment>
                ),
              },
            ],
          }
        );
      }
      setRows(rows);
    }
  }, [organizationId, components, keys, setRows]);

  const handleOnTableCollapse = (
    _event: any,
    rowKey: number,
    isOpen: boolean
  ) => {
    const newRows = [...rows];
    newRows[rowKey].isOpen = isOpen;
    setRows(newRows);
  };

  return (
    <Table
      aria-label="Keys List Table"
      cells={columns}
      rows={rows}
      actions={actions}
      onCollapse={handleOnTableCollapse}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

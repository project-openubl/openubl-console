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
} from "@patternfly/react-core";
import {
  Table,
  IRow,
  TableHeader,
  TableBody,
  ICell,
  expandable,
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
  fetchServerInfo: () => void;
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
  match,
  fetchOrganization,
  updateOrganization,
  fetchOrganizationKeys,
  fetchOrganizationComponents,
  fetchServerInfo,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();

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

  const handleChange = (checked: boolean) => {
    const data = {
      useCustomCertificates: checked,
    } as OrganizationRepresentation;

    updateOrganization(organizationId, data);
    setIsSwitchChecked(checked);
  };

  const getKeys = (map: Map<any, any>) => {
    const keys: any[] = [];
    map.forEach((value: any, key: any) => keys.push(key));
    return keys;
  };

  const getValues = (map: Map<any, any>) => {
    const values: any[] = [];
    map.forEach((value: any) => values.push(value));
    return values;
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardBody>
            <Level>
              <LevelItem>
                {serverInfo && (
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
                        isPrimary={isSwitchChecked}
                        isDisabled={!isSwitchChecked}
                      >
                        Crear certificado
                      </DropdownToggle>
                    }
                    isOpen={isDropdownOpen}
                    dropdownItems={serverInfo.componentTypes.keyProviders
                      .sort((a, b) => a.id.localeCompare(b.id))
                      .map((provider: ComponentTypeRepresentation) => (
                        <DropdownItem
                          key={provider.id}
                          isDisabled={!isSwitchChecked}
                          component={
                            <Link to={`${match.url}/~new/${provider.id}`}>
                              {provider.id}
                            </Link>
                          }
                        ></DropdownItem>
                      ))}
                  />
                )}
              </LevelItem>
              <LevelItem>
                {organization && (
                  <Switch
                    aria-label="switch"
                    label="Usar mis propios certificados"
                    labelOff="Usar los certificados de 'master'"
                    isChecked={isSwitchChecked}
                    onChange={handleChange}
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
        getKeys(componentsMap).every((providerId: string) =>
          keysMap.get(providerId)
        ) && (
          <React.Fragment>
            <StackItem>
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
                  {getValues(activeKeys).map(
                    (providerId: string, index: number) => {
                      const component = componentsMap.get(providerId)!;
                      const key = keysMap.get(providerId)!;
                      return (
                        <KeyTable
                          key={index}
                          components={[component]}
                          keys={[key]}
                        />
                      );
                    }
                  )}
                </CardBody>
              </Card>
            </StackItem>
            <StackItem>
              <Card>
                <CardHeader>Todos los certificados</CardHeader>
                <CardBody>
                  {getKeys(componentsMap).every((providerId: string) =>
                    keysMap.get(providerId)
                  ) && (
                    <KeyTable
                      components={getValues(componentsMap)}
                      keys={getValues(keysMap)}
                    />
                  )}
                </CardBody>
              </Card>
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

export interface KeyTableProps {
  components: ComponentRepresentation[];
  keys: KeyMetadataRepresentation[];
}

export const KeyTable: React.FC<KeyTableProps> = ({ components, keys }) => {
  const columns: (ICell | string)[] = [
    { title: "Estatus", transforms: [], cellFormatters: [expandable] },
    { title: "Proveedor", transforms: [] },
    { title: "Tipo", transforms: [] },
    { title: "Prioridad", transforms: [] },
  ];

  const [rows, setRows] = useState<IRow[]>([]);

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
                title: key.status,
              },
              {
                title: component.name,
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
  }, [components, keys, setRows]);

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
      onCollapse={handleOnTableCollapse}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

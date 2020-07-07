import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  StackItem,
  Card,
  CardBody,
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
  Tabs,
  Tab,
  TabTitleText,
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
import { BoxOpenIcon, CaretDownIcon } from "@patternfly/react-icons";
import {
  OrganizationRepresentation,
  KeysMetadataRepresentation,
  ComponentRepresentation,
  KeyMetadataRepresentation,
  ServerInfoRepresentation,
  ComponentTypeRepresentation,
} from "../../../models/api";
import { ObjectData } from "../../../store/common";
import { getMapKeys, getMapValues } from "../../../utils/utils";
import { deleteDialogActions } from "../../../store/deleteDialog";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {
  organization: ObjectData<OrganizationRepresentation>;
  keys: ObjectData<KeysMetadataRepresentation>;
  components: ObjectData<ComponentRepresentation[]>;
  serverInfo: ObjectData<ServerInfoRepresentation>;
}

interface DispatchToProps {
  fetchOrganization: (organizationId: string) => Promise<void>;
  updateOrganization: (
    organizationId: string,
    organization: OrganizationRepresentation
  ) => Promise<void>;
  fetchKeys: (organizationId: string) => Promise<void>;
  fetchComponents: (organizationId: string) => Promise<void>;
  deleteComponent: (
    organizationId: string,
    componentId: string
  ) => Promise<void>;
  fetchServerInfo: () => Promise<void>;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
  processingDeleteDialog: typeof deleteDialogActions.processing;
}

export interface KeyListOwnProps {
  organizationId: string;
}

export interface KeyListProps
  extends StateToProps,
    DispatchToProps,
    KeyListOwnProps,
    AppRouterProps {}

export const KeyList: React.FC<KeyListProps> = ({
  organizationId,
  organization: { data: organizationData },
  keys: { data: keysData },
  components: { data: componentsData },
  serverInfo: { data: serverInfoData },
  fetchOrganization,
  updateOrganization,
  fetchKeys,
  fetchComponents,
  deleteComponent,
  fetchServerInfo,
  showDeleteDialog,
  closeDeleteDialog,
  processingDeleteDialog,
  history,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>();

  // [providerId, Component]
  const [componentMap, setComponentMap] = useState<
    Map<string, ComponentRepresentation>
  >();

  // [providerId, Key]
  const [keyMetadataMap, setKeyMetadataMap] = useState<
    Map<string, KeyMetadataRepresentation>
  >();

  // [Type,providerId] E.g. [{RS256: 'id'}]
  const [activeKeyMap, setActiveKeyMap] = useState<Map<string, string>>();

  useEffect(() => {
    fetchOrganization(organizationId);
    fetchKeys(organizationId);
    fetchComponents(organizationId);
  }, [organizationId, fetchOrganization, fetchKeys, fetchComponents]);

  useEffect(() => {
    fetchServerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsSwitchChecked(organizationData?.useCustomCertificates);
  }, [organizationData]);

  useEffect(() => {
    if (componentsData) {
      const components: Map<string, ComponentRepresentation> = new Map();
      componentsData.forEach((c) => components.set(c.id, c));
      setComponentMap(components);
    }
  }, [componentsData]);

  useEffect(() => {
    if (keysData) {
      const keysMedatadata: Map<string, KeyMetadataRepresentation> = new Map();
      keysData.keys.forEach((e) => keysMedatadata.set(e.providerId, e));
      setKeyMetadataMap(keysMedatadata);

      const activeKeys: Map<string, string> = new Map();
      for (const k in keysData.active) {
        if (keysData.active[k]) {
          const kid = keysData.active[k];
          const key = keysData.keys.find((e) => e.kid === kid);
          activeKeys.set(k, key!.providerId);
        }
      }
      setActiveKeyMap(activeKeys);
    }
  }, [keysData]);

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
        processingDeleteDialog();
        deleteComponent(organizationId, component.id).then(() => {
          closeDeleteDialog();

          // Fetch keys and components again
          fetchKeys(organizationId);
          fetchComponents(organizationId);
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
                {organizationData && (
                  <Switch
                    aria-label="switch"
                    label="Sign with my keys"
                    labelOff={
                      <span>
                        Sign with <code>master's</code> keys
                      </span>
                    }
                    isChecked={isSwitchChecked}
                    onChange={handleSwitchChange}
                  />
                )}
              </LevelItem>
              <LevelItem>
                {serverInfoData && (
                  <KeyDropdown
                    organizationId={organizationId}
                    keyProviders={serverInfoData.componentTypes.keyProviders}
                    isDisabled={!isSwitchChecked}
                  />
                )}
              </LevelItem>
            </Level>
          </CardBody>
        </Card>
      </StackItem>
      {isSwitchChecked &&
        activeKeyMap &&
        componentMap &&
        keyMetadataMap &&
        componentMap.size === keyMetadataMap.size &&
        getMapKeys(componentMap).every((providerId: string) =>
          keyMetadataMap.get(providerId)
        ) && (
          <StackItem>
            <Card>
              <CardBody>
                <KeyTab
                  organizationId={organizationId}
                  componentMap={componentMap}
                  keyMetadataMap={keyMetadataMap}
                  activeKeyMap={activeKeyMap}
                  history={history}
                  onComponentDelete={handleComponentDelete}
                />
              </CardBody>
            </Card>
          </StackItem>
        )}
      {isSwitchChecked !== undefined && !isSwitchChecked && (
        <StackItem>
          <Card>
            <CardBody>
              <EmptyState variant={EmptyStateVariant.small}>
                <EmptyStateIcon icon={BoxOpenIcon} />
                <Title headingLevel="h4" size="lg">
                  There is no <code>keys</code> to show
                </Title>
                <EmptyStateBody>
                  All documents will be signed using <code>master</code>'s
                  keys'.
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
          Create key
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

interface KeyTabProps {
  organizationId: string;
  componentMap: Map<string, ComponentRepresentation>;
  keyMetadataMap: Map<string, KeyMetadataRepresentation>;
  activeKeyMap: Map<string, string>;
  history: any;
  onComponentDelete: (component: ComponentRepresentation) => void;
}

export const KeyTab: React.FC<KeyTabProps> = ({
  organizationId,
  componentMap,
  keyMetadataMap,
  activeKeyMap,
  history,
  onComponentDelete,
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

  return (
    <Tabs
      activeKey={activeTabKey}
      onSelect={(_, tabIndex: number | string) => {
        setActiveTabKey(tabIndex);
      }}
    >
      <Tab eventKey={0} title={<TabTitleText>All keys</TabTitleText>}>
        {getMapKeys(componentMap).every((providerId: string) =>
          keyMetadataMap.get(providerId)
        ) && (
          <KeyTable
            history={history}
            organizationId={organizationId}
            components={componentMap}
            keys={keyMetadataMap}
            onDelete={onComponentDelete}
          />
        )}
      </Tab>
      <Tab eventKey={1} title={<TabTitleText>Active key</TabTitleText>}>
        {getMapValues(activeKeyMap).map((providerId: string, index: number) => {
          const component = componentMap.get(providerId)!;
          const key = keyMetadataMap.get(providerId)!;
          return (
            <div key={index} className="pf-c-content">
              <dl>
                <dt>Provider</dt>
                <dd>
                  <Link
                    to={`/server/org/${organizationId}/keys/${component.id}/${component.providerId}`}
                  >
                    {component.name}
                  </Link>
                </dd>
                <dt>Type</dt>
                <dd>{key.type}</dd>
                <dt>Priority</dt>
                <dd>{key.providerPriority}</dd>
                <dt>Public key</dt>
                <dd>
                  <ClipboardCopy>{key.publicKey}</ClipboardCopy>
                </dd>
                <dt>Certificate</dt>
                <dd>
                  <ClipboardCopy>{key.certificate}</ClipboardCopy>
                </dd>
              </dl>
            </div>
          );
        })}
      </Tab>
    </Tabs>
  );
};

interface KeyTableProps {
  organizationId: string;
  components: Map<string, ComponentRepresentation>;
  keys: Map<string, KeyMetadataRepresentation>;
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
    { title: "Provider", transforms: [], cellFormatters: [expandable] },
    { title: "Type", transforms: [] },
    { title: "Priority", transforms: [] },
  ];

  const [rows, setRows] = useState<IRow[]>([]);

  const actions: IActions = [
    {
      title: "Edit",
      onClick: (_, rowId) => {
        const componentArray = getMapValues(components);
        history.push(
          `/server/org/${organizationId}/keys/${componentArray[rowId].id}/${componentArray[rowId].providerId}`
        );
      },
    },
    {
      title: "Delete",
      onClick: (_, rowId) => {
        const componentArray = getMapValues(components);
        onDelete(componentArray[rowId / 2]);
      },
    },
  ];

  useEffect(() => {
    if (components && keys && components.size === keys.size) {
      const rows: (IRow | string[])[] = [];

      let i = 0;
      components.forEach((v: ComponentRepresentation, k: string) => {
        const component = v;
        const key = keys.get(k);

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
                title: key!.type,
              },
              {
                title: key!.providerPriority,
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
                        <dt>Public key</dt>
                        <dd>
                          <ClipboardCopy>{key!.publicKey}</ClipboardCopy>
                        </dd>
                        <dt>Certificate</dt>
                        <dd>
                          <ClipboardCopy>{key!.certificate}</ClipboardCopy>
                        </dd>
                      </dl>
                    </div>
                  </React.Fragment>
                ),
              },
            ],
          }
        );

        i++;
      });

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

import React from "react";
import {
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import { CodeBranchIcon, CodeIcon, CubeIcon } from "@patternfly/react-icons";
import { AppRouterProps } from "../../../models/routerProps";

interface StateToProps {}

interface DispatchToProps {}

interface AddressProps extends StateToProps, DispatchToProps, AppRouterProps {}

export const KeyList: React.FC<AddressProps> = () => {
  return (
    <DataList
      aria-label="data list"
      // selectedDataListItemId={selectedDataListItemId}
      // onSelectDataListItem={this.onSelectDataListItem}
    >
      <DataListItem
        aria-labelledby="selectable-action-item1"
        id="inline-modifier-item1"
      >
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <Flex direction={{ default: "column" }}>
                  <FlexItem>
                    <p>patternfly</p>
                    <small>
                      Working repo for PatternFly 4{" "}
                      <a href="http://localhost:8080">
                        https://pf4.patternfly.org/
                      </a>
                    </small>
                  </FlexItem>
                  <Flex>
                    <FlexItem>
                      <CodeBranchIcon /> 10
                    </FlexItem>
                    <FlexItem>
                      <CodeIcon /> 4
                    </FlexItem>
                    <FlexItem>
                      <CubeIcon /> 5
                    </FlexItem>
                    <FlexItem>Updated 2 days ago</FlexItem>
                  </Flex>
                </Flex>
              </DataListCell>,
            ]}
          />
        </DataListItemRow>
      </DataListItem>
    </DataList>
  );
};

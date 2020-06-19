import * as React from "react";
import { shallow } from "enzyme";
import { TableError } from "../TableError";
import { Button } from "@patternfly/react-core";

it("Renders without crashing", () => {
  const retryAction = jest.fn();
  const wrapper = shallow(
    <TableError
      columns={["column1", "column2", "column3"]}
      onRetry={retryAction}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it("Retry action is called when button clicked", () => {
  const retryAction = jest.fn();
  const wrapper = shallow(
    <TableError
      columns={["column1", "column2", "column3"]}
      onRetry={retryAction}
    />
  );

  wrapper.find(Button).simulate("click");
  expect(retryAction.mock.calls.length).toEqual(1);
});

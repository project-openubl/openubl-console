import * as React from "react";
import { shallow } from "enzyme";
import { PageNotFound404 } from "../PageNotFound404";

it("Renders without crashing", () => {
  const action = jest.fn();
  const wrapper = shallow(<PageNotFound404 />);

  expect(wrapper).toMatchSnapshot();
});

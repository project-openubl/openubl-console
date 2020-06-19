import * as React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { TableToolbar, TableToolbarProps } from "../TableToolbar";

describe("<FilterToolbarItem />", () => {
  let intialProps: TableToolbarProps;
  beforeEach(() => {
    intialProps = {
      onFilterChange: jest.fn(),
      placeholder: "Foo",
    };
  });

  it("should render correctly", () => {
    const wrapper = mount(<TableToolbar {...intialProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call filter change callback", () => {
    const onFilterChange = jest.fn();
    const wrapper = mount(
      <TableToolbar
        {...intialProps}
        searchValue="bar"
        onFilterChange={onFilterChange}
      />
    );
    wrapper.find("input").simulate("change");
    expect(onFilterChange).toHaveBeenCalledWith("bar", expect.any(Object));
    expect(onFilterChange).toHaveBeenCalledTimes(1);
  });
});

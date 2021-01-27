import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StoriesList from "../components/StoriesList";
import * as testUtils from "../testUtils";

configure({ adapter: new Adapter() });

const setup = (stories: Array) => {
  const mockUseState = jest.fn().mockReturnValue([stories, jest.fn()]);

  React.useState = mockUseState;

  const wrapper = shallow(<StoriesList />);
  return wrapper;
};

describe("renders", () => {
  let wrapper: any;
  const stories = [{ id: 11111 }, { id: 22222 }];

  beforeEach(() => {
    wrapper = setup(stories);
  });

  test("StoriesList renders without error", () => {
    const component = testUtils.findByTestAttr(
      wrapper,
      "component-stories-list"
    );
    expect(component.length).toBe(1);
  });

  test("ErrorComponent doesn't render", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-loading");
    expect(component.length).toBe(0);
  });
});

describe("Stories is empty", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup([]);
  });

  test("StoriesList doesn't render", () => {
    const component = testUtils.findByTestAttr(
      wrapper,
      "component-stories-list"
    );
    expect(component.length).toBe(0);
  });

  test("ErrorComponent renders", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-loading");
    expect(component.length).toBe(1);
  });
});

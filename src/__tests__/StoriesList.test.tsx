import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StoriesList from "../components/StoriesList";
import * as testUtils from "../testUtils";

configure({ adapter: new Adapter() });

/**
 * setup
 *
 * Setup function for the StoriesList component tests.
 *
 * @param {boolean} error True or false depending on whether an error has been detected.
 * @returns wrapper
 */
const setup = (error: boolean) => {
  const mockUseState = jest.fn().mockReturnValue([error, jest.fn()]);

  React.useState = mockUseState;

  const wrapper = shallow(<StoriesList />);

  return wrapper;
};

describe("renders", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup(false);
  });

  test("StoriesList renders without error", () => {
    const component = testUtils.findByTestAttr(
      wrapper,
      "component-stories-list"
    );

    expect(component.length).toBe(1);
  });

  test("ErrorComponent doesn't render", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-error");
    expect(component.length).toBe(0);
  });
});

describe("StoriesList encounters an error", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup(true);
  });

  test("StoriesList doesn't render", () => {
    const component = testUtils.findByTestAttr(
      wrapper,
      "component-stories-list"
    );
    expect(component.length).toBe(0);
  });

  test("ErrorComponent renders", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-error");
    expect(component.length).toBe(1);
  });
});

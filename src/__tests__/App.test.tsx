import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import * as testUtils from "../testUtils";

configure({ adapter: new Adapter() });

/**
 * setup
 *
 * Setup function for the App component tests.
 *
 * @param {boolean} [isInProduction=false] True or false flag depending on whether the app is running in a production environment.
 * @param {boolean} [newVersionAvailable=false] True or false depending on whether a new version of the app's content has been detected.
 * @returns wrapper
 */
const setup = (
  isInProduction: boolean = false,
  newVersionAvailable: boolean = false
) => {
  const mockUseState = jest
    .fn()
    .mockReturnValue([newVersionAvailable, jest.fn()]);
  React.useState = mockUseState;

  const mockUseRef = jest.fn().mockReturnValueOnce({ current: isInProduction });
  React.useRef = mockUseRef;

  const wrapper = shallow(<App />);
  return wrapper;
};

describe("renders", () => {
  const wrapper = setup();

  test("App renders without error", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
  });
});

describe("App is in production (pwa activated)", () => {
  let wrapper = setup(true);

  test("Offline warning renders", () => {
    const component = testUtils.findByTestAttr(
      wrapper,
      "component-offline-warning"
    );
    expect(component.length).toBe(1);
  });

  describe("New content is available", () => {
    wrapper = setup(true, true);

    test("New content alert is rendered", () => {
      const component = testUtils.findByTestAttr(
        wrapper,
        "component-new-version"
      );
      expect(component.length).toBe(1);
    });

    test("Refresh button is clicked", () => {
      const { location } = window;
      delete window.location;
      window.location = { reload: jest.fn() };

      wrapper.find(".refresh-button").simulate("click");
      expect(window.location.reload).toHaveBeenCalled();

      window.location = location;
    });
  });
});

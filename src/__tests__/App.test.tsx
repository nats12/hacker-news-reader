import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import * as testUtils from "../testUtils";

configure({ adapter: new Adapter() });

const setup = (state = {}) => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe("renders", () => {
  const wrapper = setup({});

  test("App renders without error", () => {
    const component = testUtils.findByTestAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
  });
});

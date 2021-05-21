//@ts-nocheck
import React from "react";
import GoogleAnalytics from "../../components/GoogleAnalytics";
import { render } from "@testing-library/react";

describe("Google Analytics Component", () => {
  test("Renders", () => {
    process.env.NODE_ENV = "production";
    process.browser = true;

    const component = render(<GoogleAnalytics />);
    const div = component.queryByTestId("ga-div");
    expect(div).toBeFalsy();
  });
});

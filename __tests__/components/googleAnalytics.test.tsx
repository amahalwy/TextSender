import GoogleAnalytics from "../../components/GoogleAnalytics";
import React from "react";
import { render } from "@testing-library/react";
import endpoints from "../../config/endpoints";

describe("Google Analytics Component", () => {
  test("Renders", () => {
    const component = render(<GoogleAnalytics />);
    expect(component).toBeTruthy();
  });
});

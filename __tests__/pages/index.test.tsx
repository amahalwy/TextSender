import React from "react";
import Home from "../../pages/index";
import { render, fireEvent } from "@testing-library/react";

describe("Index Page", () => {
  test("Renders", () => {
    const component = render(<Home />);
    expect(component).toBeTruthy();
  });

  test("Should submit", () => {
    const publish = jest.fn();
    const set = jest.fn();
    const onSubmitSpy = jest.fn();

    const component = render(<Home />);
    const indexForm = component.getByTestId("index-form");
    indexForm.onsubmit = onSubmitSpy;

    fireEvent.submit(indexForm);

    expect(onSubmitSpy).toHaveBeenCalled();
  });
});

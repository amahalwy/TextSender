import React from "react";
import { fireEvent, render } from "@testing-library/react";
import FormSection from "../../components/FormSection";

describe("Bottom Section", () => {
  const fn = jest.fn();
  const fn2 = jest.fn();

  const props = {
    numbers: ["1234567890", "1234567891", "1234567892"],
    showBottom: true,
    loadingNumbers: true,
    showTwilioSection: true,
    setFormData: jest.fn(),
    setNumbers: jest.fn(),
    setShowBottom: fn,
    setLoadingNumbers: jest.fn(),
    setShowTwilioSection: fn2,
  };
  test("Respond to on click", () => {
    const component = render(<FormSection {...props} />);
    const numbers = component.getByTestId("numbers");
    const button = component.getByTestId("bottom-reset");
    fireEvent.change(numbers, { target: { value: "123456789" } });
    fireEvent.click(button);
    expect(fn2).toHaveBeenCalled();
  });
});

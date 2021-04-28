import { render } from "@testing-library/react";
import React from "react";
import { SuccessfulText, FailedText } from "../../components/NumberSendRow";

describe("NumberSendRow", () => {
  const mockFn = jest.fn();

  test("Renders CheckIcon", () => {
    const props = {
      addSuccess: false,
      setAddSuccess: jest.fn(),
      successfulTexts: 0,
      setSuccessfulTexts: mockFn,
    };
    const component = render(<SuccessfulText {...props} />);
    const box = component.getByTestId("success-box");
    const check = component.getByTestId("check");
    expect(box.lastChild).toBe(check);
  });

  test("SuccessfulText component increments for every successful text", () => {
    const props = {
      addSuccess: true,
      setAddSuccess: jest.fn(),
      successfulTexts: 0,
      setSuccessfulTexts: mockFn,
    };
    render(<SuccessfulText {...props} />);
    expect(mockFn).toHaveBeenCalled();
  });

  test("Renders CloseIcon", () => {
    const props = {
      addFailed: false,
      setAddFailed: jest.fn(),
      failedTexts: 0,
      setFailedTexts: mockFn,
    };

    const component = render(<FailedText {...props} />);
    const box = component.getByTestId("fail-box");
    const close = component.getByTestId("close");
    expect(box.lastChild).toBe(close);
  });

  test("FailedText component increments for every failed text", () => {
    const props = {
      addFailed: true,
      setAddFailed: jest.fn(),
      failedTexts: 0,
      setFailedTexts: mockFn,
    };

    render(<FailedText {...props} />);
    expect(mockFn).toHaveBeenCalled();
  });
});

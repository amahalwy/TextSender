import { render } from "@testing-library/react";
import React from "react";
import { SuccessfulText } from "../../components/NumberSendRow";
import { CheckIcon } from "@chakra-ui/icons";

describe("NumberSendRow", () => {
  const successFn = jest.fn();

  const props = {
    addSuccess: false,
    setAddSuccess: jest.fn(),
    successfulTexts: 0,
    setSuccessfulTexts: successFn,
  };
  test("Renders CheckIcon", () => {
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
      setSuccessfulTexts: successFn,
    };
    const component = render(<SuccessfulText {...props} />);
    expect(successFn).toHaveBeenCalled();
  });
});

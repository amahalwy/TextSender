import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Submit from "../../components/Form/Submit";

describe("Submit section", () => {
  test("Submits", async () => {
    const findNumbers = jest.fn();

    const props = {
      findNumbers,
      submitting: false,
      pristine: false,
      invalid: false,
      loadingNumbers: false,
      values: {
        accountSid: "123",
        apiKey: "dummy",
        apiSecret: "dummy",
        numbers: "1234567890, 1234567891, 1234567892",
        message: "dummy",
        from: "dummy",
      },
    };

    const component = render(<Submit {...props} />);
    const button = component.getByTestId("find-button");

    fireEvent.click(button);

    expect(findNumbers).toHaveBeenCalled();
  });
});

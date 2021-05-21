import React from "react";
import Home from "../../pages/index";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import NumberSendRow from "../../components/NumberSendRow";

describe("Index Page", () => {
  test("Renders", () => {
    const component = render(<Home />);
    expect(component).toBeTruthy();
  });

  test("Renders NumberSendRow", () => {
    // const props = {
    //   key: 1,
    //   receiver: {
    //     to: "12345",
    //     timeToSend: 1234,
    //     accountSid: "12345",
    //     apiKey: "12345",
    //     apiSecret: "12345",
    //     message: "12345",
    //     from: "12345",
    //   },
    //   failedTexts: 0,
    //   successfulTexts: 0,
    //   setFailedTexts: jest.fn(),
    //   setSuccessfulTexts: jest.fn(),
    // };

    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    setState("hello");

    // expect(setState).toHaveBeenCalledTimes(1);
    // const component = render(<NumberSendRow {...props} />);
    // expect(component).toBeTruthy();
  });
});

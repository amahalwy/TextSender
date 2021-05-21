import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ChakraProvider, ThemeProvider, theme } from "@chakra-ui/react";
import FormSection from "../../components/FormSection";

require("dotenv").config({
  path: ".env.test",
});

describe("Find Number Form", () => {
  jest.mock("@chakra-ui/react", () => {
    const ui = jest.requireActual("@chakra-ui/react");
    return {
      ...ui,
      customKey: "customValue",
    };
  });
  const props = {
    numbers: ["1234567890", "1234567891", "1234567892"],
    showBottom: true,
    loadingNumbers: true,
    showTwilioSection: true,
    setFormData: jest.fn(),
    setNumbers: jest.fn(),
    setShowBottom: jest.fn(),
    setLoadingNumbers: jest.fn(),
    setShowTwilioSection: jest.fn(),
  };

  test("Form renders", () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <FormSection {...props} />
      </ThemeProvider>
    );
    expect(component).toBeTruthy();
  });

  test("Sid field displays error when invalid", async () => {
    const setLoadingNumbers = jest.fn();
    const props = {
      numbers: ["1234567890", "1234567891", "1234567892"],
      showBottom: true,
      loadingNumbers: false,
      showTwilioSection: true,
      setFormData: jest.fn(),
      setNumbers: jest.fn(),
      setShowBottom: jest.fn(),
      setLoadingNumbers: setLoadingNumbers,
      setShowTwilioSection: jest.fn(),
    };
    const { getByTestId } = render(
      <ChakraProvider theme={theme}>
        <FormSection {...props} />
      </ChakraProvider>
    );

    const sid = getByTestId("sid-input");
    const api = getByTestId("api-input");
    const secret = getByTestId("secret-input");

    fireEvent.change(sid, { target: { value: "hello" } });
    fireEvent.change(api, { target: { value: "hello" } });
    fireEvent.change(secret, { target: { value: "hello" } });
  });

  test("API field displays error when invalid", () => {
    const component = render(<FormSection {...props} />);
    expect(component).toBeTruthy();
  });

  test("Secret field displays error when invalid", () => {
    const component = render(<FormSection {...props} />);
    expect(component).toBeTruthy();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, theme } from "@chakra-ui/react";

export const renderWithTheme = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => {
  const Wrapper = ({ children }: any) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

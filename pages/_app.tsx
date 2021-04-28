import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const SafeHydrate = ({ children }: any) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SafeHydrate>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SafeHydrate>
);

export default MyApp;

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

// export default MyApp;

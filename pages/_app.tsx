import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { initGA } from "../components/ReactGA";

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => initGA(), []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;

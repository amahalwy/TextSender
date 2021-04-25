import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

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

// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });

export default MyApp;

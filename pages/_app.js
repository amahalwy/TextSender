import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

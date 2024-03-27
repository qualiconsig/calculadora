import { MathContext } from "@/context/formContext";
import { MathInbursa } from "@/context/guardResfrommath";

import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {" "}
      <MathContext>
        <MathInbursa>
          <Component {...pageProps} />
        </MathInbursa>
      </MathContext>
    </ChakraProvider>
  );
}

import { MathContext } from "@/context/pagbankContext";
import { MathInbursa } from "@/context/InbursaContext";

import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { MathC6 } from "@/context/C6Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {" "}
      <MathContext>
        <MathInbursa>
          <MathC6>
            <Component {...pageProps} />
            </MathC6>
        </MathInbursa>
      </MathContext>
    </ChakraProvider>
  );
}

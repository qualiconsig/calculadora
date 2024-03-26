import { MathContext } from "@/context/formContext";


import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {" "}
      <MathContext>
        
          <Component {...pageProps} />
        
      </MathContext>
    </ChakraProvider>
  );
}

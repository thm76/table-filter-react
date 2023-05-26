import { ChakraProvider, Heading } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Heading as="h1">Hello</Heading>
    </ChakraProvider>
  </React.StrictMode>
);

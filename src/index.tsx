import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { DataProvider } from "./providers/DataProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { FilterInComponent } from "./pages/FilterInComponent";
import { FilterInTableRow } from "./pages/FilterInTableRow";
import { SimpleFilter } from "./pages/SimpleFilter";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" element={<App />}>
              <Route path="filter-in-table" element={<FilterInTableRow />} />
              <Route path="filter-component" element={<FilterInComponent />} />
              <Route path="simple-filter" element={<SimpleFilter />} />
              <Route path="*" element={<Navigate to="filter-in-table" />} />
            </Route>
          </Routes>
        </DataProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { FunctionComponent, ReactNode, useContext } from "react";
import { DataContext } from "./DataContext";
import { TableData } from "../models/table-data.model";

type DataProviderProps = {
  children?: ReactNode;
};
export const DataProvider: FunctionComponent<DataProviderProps> = (props) => {
  return (
    <DataContext.Provider
      value={[
        {
          name: "Billy",
          startYear: 2021,
        },
        {
          name: "Donna",
          startYear: 1983,
        },
        {
          name: "Jonathan",
          startYear: 1998,
        },
        {
          name: "Karen",
          startYear: 1998,
        },
        {
          name: "Thomas",
          startYear: 2021,
        },
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = (): TableData[] => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(`useData needs to be used inside a <DataProvider>`);
  }
  return context;
};

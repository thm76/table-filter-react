import { createContext } from "react";
import { TableData } from "../models/table-data.model";

export const DataContext = createContext<TableData[]>([]);

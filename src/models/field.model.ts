import { FilterConfig } from "./filter-config.model";
import { FunctionComponent } from "react";

export type GetFn<ObjType, FieldType> = (obj: ObjType) => FieldType | undefined;
export type FormatFn<FieldType> = (value: FieldType | undefined) => string;
export type FieldComponent<ObjType, FieldType> = FunctionComponent<{
  obj: ObjType;
  highlight?: string;
}>;

/**
 * a Field knows how to get the data, format it (for full text search),
 * render it, and what filters can be applied to the data
 *
 * There a functions to create fields for different data (strings and numbers
 * in this proof of concept). A real application would also have dates,
 * booleans, and maybe currency values (basically numbers that get formatted
 * differently)
 */
export type Field<ObjType, FieldType> = {
  label: string;
  get: GetFn<ObjType, FieldType>;
  format: FormatFn<FieldType>;
  component: FieldComponent<ObjType, FieldType>;
  filterConfigs: FilterConfig<ObjType, FieldType>[];
};

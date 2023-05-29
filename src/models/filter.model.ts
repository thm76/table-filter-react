import {Field} from "./field.model";
import {FilterConfig} from "./filter-config.model";

/**
 * wraps information about which field we filter on, which config
 * we use, and what the user supplied data is
 */
export type Filter<ObjType, FieldType> = {
  field?: Field<ObjType, FieldType>;
  config?: FilterConfig<ObjType, FieldType>;
  data?: FieldType;
};

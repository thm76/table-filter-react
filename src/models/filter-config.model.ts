/**
 * contains a label and filter function.
 * Each Field type might have multiple different of each,
 * specific to the data type that the field is showing.
 * For instance, text fields could have "is", "is not", "starts with",
 * "contains", "ends with" and so on.
 * Date fields might have "before", "on or before", "after", "on or after",
 * "last x months" and so on
 */
export type FilterConfig<ObjType, FieldType> = {
  label: string;
  filterFn: (obj: ObjType, data: FieldType) => boolean;
};

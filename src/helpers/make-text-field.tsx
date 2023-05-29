import { Field, FormatFn, GetFn } from "../models/field.model";
import { HighlightedText } from "../components/HighlightedText";

export function MakeTextField<ObjType>(
  label: string,
  get: GetFn<ObjType, string>
): Field<ObjType, string> {
  const format: FormatFn<string> = (value: string | undefined) => value ?? "";
  return {
    label,
    get,
    format,
    component: (props) => (
      <HighlightedText
        text={format(get(props.obj))}
        highlight={props.highlight}
      />
    ),
    filterConfigs: [
      {
        label: "contains",
        filterFn: (obj, data) => {
          if (typeof data !== "string" || data.trim() === "") {
            return true;
          }
          return (
            (get(obj) ?? "").toLowerCase().indexOf(data.toLowerCase()) !== -1
          );
        },
      },
      {
        label: "starts with",
        filterFn: (obj, data) => {
          if (typeof data !== "string" || data.trim() === "") {
            return true;
          }
          return (get(obj) ?? "").toLowerCase().startsWith(data.toLowerCase());
        },
      },
    ],
  };
}

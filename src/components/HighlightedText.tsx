import { FunctionComponent, useMemo } from "react";
import { Text } from "@chakra-ui/react";

type HighlightedTextProps = {
  text: string;
  highlight?: string;
  ariaLabel?: string;
};

type Part = {
  text: string;
  type: "normal" | "matched";
};

export const HighlightedText: FunctionComponent<HighlightedTextProps> = (
  props
) => {
  const parts = useMemo<Part[]>(() => {
    if (typeof props.highlight !== "string" || props.highlight.trim() === "") {
      return [{ text: props.text, type: "normal" }];
    }

    // collect all matched
    const regexp = new RegExp(props.highlight, "ig");
    const matches: RegExpMatchArray[] = [];
    let match;

    while ((match = regexp.exec(props.text)) !== null) {
      matches.push(match);
    }

    // find normal and matched parts
    const { parts, startIndex } = matches.reduce(
      (acc, { index }) => {
        index = index as number;
        if (index > acc.startIndex) {
          acc.parts.push({
            text: props.text.substr(acc.startIndex, index - acc.startIndex),
            type: "normal",
          });
        }

        acc.parts.push({
          text: props.text.substr(index, props.highlight!.length),
          type: "matched",
        });
        acc.startIndex = index + props.highlight!.length;

        return acc;
      },
      { parts: [], startIndex: 0 } as { parts: Part[]; startIndex: number }
    );

    // if anything is left then add as normal
    if (startIndex < props.text.length) {
      parts.push({
        text: props.text.substr(startIndex),
        type: "normal",
      });
    }

    return parts;
  }, [props.text, props.highlight]);

  return (
    <Text as="span" aria-label={props.ariaLabel}>
      {parts.map((part, index) =>
        part.type === "normal" ? (
          <Text as="span" key={index}>
            {part.text}
          </Text>
        ) : (
          <Text as="strong" key={index}>
            {part.text}
          </Text>
        )
      )}
    </Text>
  );
};

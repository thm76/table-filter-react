import { FunctionComponent, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type TileProps = {
  children?: ReactNode;
};
export const Tile: FunctionComponent<TileProps> = (props) => (
  <Box p="0.6rem" boxShadow="lg" rounded="lg" bg="#fdfdfd">
    {props.children}
  </Box>
);

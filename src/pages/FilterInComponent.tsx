import { FunctionComponent } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import { Tile } from "../components/Tile";
import { Table } from "../components/Table";
import { TableFields } from "../models/table-fields";
import { useData } from "../providers/DataProvider";

export const FilterInComponent: FunctionComponent = () => {
  const data = useData();

  return (
    <Grid gap="0.6rem">
      <Heading as="h2">Filters above table</Heading>
      <Tile>
        <Table fields={TableFields} data={data} filterMode="advanced" />
      </Tile>
    </Grid>
  );
};

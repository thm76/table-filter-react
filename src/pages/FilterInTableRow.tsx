import { FunctionComponent } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import { Tile } from "../components/Tile";
import { TableFields } from "../models/table-fields";
import { Table } from "../components/Table";
import { useData } from "../providers/DataProvider";

export const FilterInTableRow: FunctionComponent = () => {
  const data = useData();

  return (
    <Grid gap="0.6rem">
      <Heading as="h2">Filters inside table headers</Heading>
      <Tile>
        <Table fields={TableFields} data={data} filterMode="in-table" />
      </Tile>
    </Grid>
  );
};

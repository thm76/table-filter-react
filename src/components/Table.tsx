import {
  ChangeEvent,
  FormEventHandler,
  Fragment,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Field } from "../models/field.model";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Filter } from "../models/filter.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

type TableProps = {
  fields: Field<any, any>[];
  data: any[];
  filterMode?: "off" | "in-table" | "advanced" | "simple";
};
export const Table: FunctionComponent<TableProps> = (props) => {
  const [conditions, setConditions] = useState(
    props.filterMode === "in-table"
      ? props.fields.map((field) => ({ field } as Filter<any, any>))
      : props.filterMode === "simple"
      ? [
          {
            config: {
              label: "Filter",
              filterFn: (obj, data) =>
                props.fields.some((field) => {
                  const filterText = data ?? "";
                  if (filterText.trim() === "") {
                    return true;
                  }
                  const formatted = field.format(field.get(obj)).toLowerCase();
                  return formatted.indexOf(filterText.toLowerCase()) !== -1;
                }),
            },
            data: "",
          },
        ]
      : []
  );

  const filterableFields = useMemo(
    () => props.fields.filter(($) => $.filterConfigs.length > 0),
    [props.fields]
  );

  const filteredData = useMemo(
    () =>
      props.data.filter((obj) =>
        conditions
          .filter(($) => $.config)
          .every((filter) => filter.config!.filterFn(obj, filter.data))
      ),
    [props.data, conditions]
  );

  const handleSimpleFilter = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      const data = e.currentTarget.value;
      setConditions(($) => [{ ...$[0], data }, ...$.slice(1)]);
    },
    []
  );

  const removeConditionAtIndex = useCallback(
    (index: number) => () => {
      {
        setConditions(($) => [...$.slice(0, index), ...$.slice(index + 1)]);
      }
    },
    []
  );

  const handleSelectFieldAtIndex = useCallback(
    (index: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const field = props.fields.find(($) => $.label === e.currentTarget.value);
      if (field) {
        setConditions(($) => [
          ...$.slice(0, index),
          { ...$[index], field, config: undefined },
          ...$.slice(index + 1),
        ]);
      }
    },
    [props.fields]
  );

  const handleSelectFilterAtIndex = useCallback(
    (filter: Filter<any, any>, index: number) =>
      (e: ChangeEvent<HTMLSelectElement>) => {
        const config = filter.field!.filterConfigs.find(
          ($) => $.label === e.currentTarget.value
        );
        setConditions(($) => [
          ...$.slice(0, index),
          { ...$[index], config },
          ...$.slice(index + 1),
        ]);
      },
    []
  );

  const handleDataInputAtIndex = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const data = e.currentTarget.value;
      setConditions(($) => [
        ...$.slice(0, index),
        {
          ...$[index],
          data,
        },
        ...$.slice(index + 1),
      ]);
    },
    []
  );

  const highlight = useMemo(
    () => (props.filterMode === "simple" ? conditions[0].data : undefined),
    [props.filterMode, conditions]
  );

  return (
    <Grid gap="04rem">
      {props.filterMode === "simple" ? (
        <FormControl>
          <FormLabel htmlFor="filter">{conditions[0].config!.label}</FormLabel>
          <Input
            id="filter"
            value={conditions[0].data}
            onChange={handleSimpleFilter}
          />
        </FormControl>
      ) : null}
      {props.filterMode === "advanced" ? (
        <Grid gridTemplateColumns="30px 1fr" gap="0.4rem" alignItems="center">
          {conditions.map((condition, index) => (
            <Fragment key={index}>
              <Button
                size="sm"
                variant="outline"
                onClick={removeConditionAtIndex(index)}
              >
                -
              </Button>
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="0.4rem">
                <Select
                  value={condition.field?.label ?? -1}
                  onChange={handleSelectFieldAtIndex(index)}
                >
                  <option key={-1} value={-1}>
                    Select a field...
                  </option>
                  {filterableFields.map((field, index) => (
                    <option key={index} value={field.label}>
                      {field.label}
                    </option>
                  ))}
                </Select>
                {condition.field ? (
                  <>
                    <Select
                      value={condition.config?.label ?? -1}
                      onChange={handleSelectFilterAtIndex(condition, index)}
                    >
                      <option key={-1} value={-1}>
                        Select a filter...
                      </option>
                      {condition.field.filterConfigs.map((config, index) => (
                        <option key={index} value={config.label}>
                          {config.label}
                        </option>
                      ))}
                    </Select>
                    {condition.config ? (
                      <Input
                        value={condition.data ?? ""}
                        onChange={handleDataInputAtIndex(index)}
                      />
                    ) : null}
                  </>
                ) : null}
              </Grid>
            </Fragment>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setConditions(($) => [...$, {}]);
            }}
          >
            +
          </Button>
        </Grid>
      ) : null}
      <ChakraTable>
        <Thead>
          <Tr>
            {props.fields.map((field, index) => (
              <Th key={index}>
                <HStack gap="0.4rem" justifyContent="space-between">
                  <span>{field.label}</span>
                  {props.filterMode === "in-table" ? (
                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          aria-label="filter"
                          icon={<FontAwesomeIcon icon={faFilter} />}
                          variant={conditions[index].config ? "solid" : "ghost"}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Grid p="2rem 0.4rem 0.4rem 0.4rem" gap="0.4rem">
                            <Select
                              value={conditions[index].config?.label ?? -1}
                              onChange={(e) => {
                                const config = field.filterConfigs.find(
                                  ($) => $.label === e.currentTarget.value
                                );
                                setConditions(($) => [
                                  ...$.slice(0, index),
                                  {
                                    ...$[index],
                                    config,
                                  },
                                  ...$.slice(index + 1),
                                ]);
                              }}
                            >
                              <option key={-1} value={-1}>
                                (All)
                              </option>
                              {field.filterConfigs.map((config, index) => (
                                <option key={index} value={config.label}>
                                  {config.label}
                                </option>
                              ))}
                            </Select>
                            <Input
                              value={conditions[index].data ?? ""}
                              onInput={handleDataInputAtIndex(index)}
                            />
                          </Grid>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((obj, objIndex) => (
            <Tr key={objIndex}>
              {props.fields.map((field, index) => (
                <Td key={index}>{field.component({ obj, highlight })}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Grid>
  );
};
